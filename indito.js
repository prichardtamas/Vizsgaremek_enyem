const { spawn, execSync } = require('child_process');
const path = require('path');

console.log('\n--- 🚀 VIZSGAREMEK RENDSZER INDÍTÁSA ---');

/**
 * Segédfüggvény a Docker parancsokhoz (szinkron futtatás)
 */
function runDocker(command) {
    try {
        console.log(`\n🐳 Docker: ${command === 'up -d' ? 'Indítás...' : 'Leállítás...'}`);
        execSync(`docker-compose ${command}`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`❌ Hiba a Docker művelet során (${command}):`, error.message);
    }
}

// 1. Docker konténerek elindítása (Adatbázis, PHP, stb.)
runDocker('up -d');

// 2. npm folyamatok konfigurációja
const processes = [
    { name: 'BACKEND', cwd: path.join(__dirname, 'Backend') },
    { name: 'FRONTEND', cwd: path.join(__dirname, 'Frontend') }
];

const runningProcesses = [];

// 3. Backend és Frontend indítása párhuzamosan
processes.forEach(p => {
    console.log(`📦 ${p.name} indítása a ${p.cwd} mappából...`);
    const proc = spawn('npm', ['run', 'dev'], { 
        cwd: p.cwd, 
        shell: true, 
        stdio: 'inherit' 
    });

    runningProcesses.push(proc);
});

console.log('\n✅ Minden folyamat elindult! Leállításhoz nyomj CTRL+C-t.\n');

/**
 * TAKARÍTÁS FUNKCIÓ
 * Ez fut le, ha bezárod a programot.
 */
function cleanup() {
    console.log('\n\n--- 🛑 LEÁLLÍTÁS FOLYAMATBAN... ---');

    // Docker leállítása és konténerek eltávolítása
    runDocker('down');

    console.log('👋 Minden leállt. Szép munkát!\n');
    
    // Kényszerített kilépés, hogy ne maradjon lógó folyamat
    process.exit(0);
}

// Figyeljük a CTRL+C jelet (SIGINT)
process.on('SIGINT', cleanup);

// Figyeljük a terminál bezárását (SIGTERM)
process.on('SIGTERM', cleanup);

// Windows specifikus: kezeli, ha a folyamat váratlanul megszakad
process.on('exit', () => {
    // Itt már csak szinkron kód futhatna, a fő takarítást a cleanup végzi
});