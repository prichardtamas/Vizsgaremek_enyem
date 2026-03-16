require("dotenv").config();      // Beolvassuk a környezeti változókat (.env)
const app = require('./src/app'); // Behúzzuk a teljesen felkészített appot

// Megadjuk a portot
const PORT = process.env.PORT || 3000;

// Elindítjuk a figyelést
app.listen(PORT, () => {
    console.log(`--------------------------------------------------`);
    console.log(`🚀 Zeneiskola API elindítva!`);
    console.log(`📡 Cím: http://localhost:${PORT}`);
    console.log(`📂 Mód: ${process.env.NODE_ENV || 'development'}`);
    console.log(`--------------------------------------------------`);
});