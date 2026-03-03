-- Létrehozzuk az adatbázist UTF-8 karakterkódolással
CREATE DATABASE IF NOT EXISTS zeneiskola_mysql
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE zeneiskola_mysql;

-- Bejelentkezések tábla
CREATE TABLE IF NOT EXISTS bejelentkezesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fnev VARCHAR(255) NOT NULL UNIQUE,
    jelszo VARCHAR(255) NOT NULL,
    jogosultsag VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- Kategóriák tábla
CREATE TABLE IF NOT EXISTS kategoriak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    katNev VARCHAR(255) NOT NULL
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- Leltár tábla
CREATE TABLE IF NOT EXISTS leltarak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ar INT NOT NULL,
    elerhetoseg BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- Hangszerek tábla
CREATE TABLE IF NOT EXISTS hangszerek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    katId INT NOT NULL,
    leltarId INT NOT NULL,
    nev VARCHAR(255) NOT NULL,
    FOREIGN KEY (katId) REFERENCES kategoriak(id) ON DELETE CASCADE,
    FOREIGN KEY (leltarId) REFERENCES leltarak(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- Diákok tábla
CREATE TABLE IF NOT EXISTS diakok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    telefonsz VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    szulDatum DATE NOT NULL,
    sajatHangszer VARCHAR(255)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- Tanárok tábla
CREATE TABLE IF NOT EXISTS tanarok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    telefonsz VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- Fix tanárok feltöltése
INSERT INTO tanarok (nev, telefonsz, email) VALUES
('Kovács Anna', '06701234567', 'kovacs.anna@example.com'),
('Szabó Dóra', '06707654321', 'szabo.dora@example.com'),
('Tóth Emese', '06703456789', 'toth.emese@example.com'),
('Németh Gábor', '06709876543', 'nemeth.gabor@example.com'),
('Kiss Réka', '06702345678', 'kiss.reka@example.com'),
('Kerekes Ádám', '06708765432', 'kerekes.adam@example.com'),
('Horváth Nóra', '06705678901', 'horvath.nora@example.com'),
('Varga Petra', '06706543210', 'varga.petra@example.com'),
('Sipos Bence', '06707654322', 'sipos.bence@example.com');

-- Kapcsolótábla (KiMitTud)
CREATE TABLE IF NOT EXISTS kimittud (
    tanarId INT NOT NULL,
    hangszerId INT NOT NULL,
    PRIMARY KEY (tanarId, hangszerId),
    FOREIGN KEY (tanarId) REFERENCES tanarok(id) ON DELETE CASCADE,
    FOREIGN KEY (hangszerId) REFERENCES hangszerek(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- Órák tábla
CREATE TABLE IF NOT EXISTS orak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tanarId INT NOT NULL,
    diakId INT NOT NULL,
    tema VARCHAR(255) NOT NULL,
    FOREIGN KEY (tanarId) REFERENCES tanarok(id) ON DELETE CASCADE,
    FOREIGN KEY (diakId) REFERENCES diakok(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- Kölcsönzések tábla
CREATE TABLE IF NOT EXISTS kolcsonzesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hangszerId INT NOT NULL,
    diakId INT NOT NULL,
    kolcsKezd TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    kolcsVeg DATE NOT NULL,
    megjegyzes TEXT,
    FOREIGN KEY (hangszerId) REFERENCES hangszerek(id) ON DELETE CASCADE,
    FOREIGN KEY (diakId) REFERENCES diakok(id) ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;