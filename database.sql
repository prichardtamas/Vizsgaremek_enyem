SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS zeneiskola_mysql;
CREATE DATABASE zeneiskola_mysql
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_hungarian_ci;

USE zeneiskola_mysql;

CREATE TABLE bejelentkezesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fnev VARCHAR(255) NOT NULL UNIQUE,
    jelszo VARCHAR(255) NOT NULL,
    jogosultsag VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- Tanárok bejelentkezései
INSERT INTO bejelentkezesek (fnev, jelszo, jogosultsag, email) VALUES
('kovacs.anna', 'pass123', 'tanar', 'kovacs.anna@example.com'),
('szabo.dora', 'pass123', 'tanar', 'szabo.dora@example.com'),
('toth.emese', 'pass123', 'tanar', 'toth.emese@example.com'),
('nemeth.gabor', 'pass123', 'tanar', 'nemeth.gabor@example.com'),
('kiss.reka', 'pass123', 'tanar', 'kiss.reka@example.com'),
('kerekes.adam', 'pass123', 'tanar', 'kerekes.adam@example.com'),
('horvath.nora', 'pass123', 'tanar', 'horvath.nora@example.com'),
('varga.petra', 'pass123', 'tanar', 'varga.petra@example.com'),
('sipos.bence', 'pass123', 'tanar', 'sipos.bence@example.com');

-- Diákok bejelentkezései
INSERT INTO bejelentkezesek (fnev, jelszo, jogosultsag, email) VALUES
('nagy.peter', 'pass123', 'diak', 'nagy.peter@example.com'),
('kiss.anna', 'pass123', 'diak', 'kiss.anna@example.com'),
('horvath.bence', 'pass123', 'diak', 'horvath.bence@example.com'),
('toth.lili', 'pass123', 'diak', 'toth.lili@example.com'),
('szabo.daniel', 'pass123', 'diak', 'szabo.daniel@example.com'),
('farkas.eszter', 'pass123', 'diak', 'farkas.eszter@example.com'),
('molnar.david', 'pass123', 'diak', 'molnar.david@example.com'),
('kerekes.reka', 'pass123', 'diak', 'kerekes.reka@example.com'),
('varga.balint', 'pass123', 'diak', 'varga.balint@example.com'),
('sipos.nora', 'pass123', 'diak', 'sipos.nora@example.com');

-- Admin felhasználó
INSERT INTO bejelentkezesek (fnev, jelszo, jogosultsag, email) VALUES
('info', 'Premo900', 'admin', 'info@admin.com');

CREATE TABLE kategoriak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    katNev VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO kategoriak (katNev) VALUES
('Gitár'),
('Hegedű'),
('Erősítő'),
('Basszusgitár'),
('Szaxofon'),
('Dob'),
('Zongora'),
('Szintetizátor');

CREATE TABLE leltarak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ar INT NOT NULL,
    elerhetoseg BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO leltarak (ar, elerhetoseg) VALUES
(2990, TRUE),   -- Yamaha C40 Klasszikus Gitár
(3990, TRUE),   -- Stentor Student II Hegedű
(4490, TRUE),   -- Boss Katana 50 MkII Erősítő
(5990, TRUE),   -- Fender Stratocaster
(6490, TRUE),   -- Fender Jazz Bass
(6990, TRUE),   -- Marshall DSL40CR Gitár Erősítő
(7490, TRUE),   -- Yamaha YAS-280 Alto Szaxofon
(8490, TRUE),   -- Yamaha P-125 Digitális Zongora
(8990, TRUE),   -- Gibson Les Paul Standard
(8990, TRUE),   -- Mapex Mars Akusztikus Dob
(11990, TRUE),  -- Korg Nautilus 61 Szintetizátor
(12990, TRUE),  -- Pearl Export Dobfelszerelés
(12990, TRUE),  -- Selmer Paris Tenor Szaxofon
(14990, TRUE),  -- Roland TD-17KVX Elektromos Dob
(15990, TRUE);  -- Kawai K-15 Akusztikus Zongora

CREATE TABLE hangszerek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    katId INT NOT NULL,
    leltarId INT NOT NULL UNIQUE,
    nev VARCHAR(255) NOT NULL,
    FOREIGN KEY (katId) REFERENCES kategoriak(id) ON DELETE CASCADE,
    FOREIGN KEY (leltarId) REFERENCES leltarak(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO hangszerek (katId, leltarId, nev) VALUES
(1,1,'Yamaha C40 Klasszikus Gitár'),
(2,2,'Stentor Student II Hegedű'),
(3,3,'Boss Katana 50 MkII Erősítő'),
(1,4,'Fender Stratocaster'),
(4,5,'Fender Jazz Bass'),
(3,6,'Marshall DSL40CR Gitár Erősítő'),
(5,7,'Yamaha YAS-280 Alto Szaxofon'),
(7,8,'Yamaha P-125 Digitális Zongora'),
(1,9,'Gibson Les Paul Standard'),
(6,10,'Mapex Mars Akusztikus Dob'),
(8,11,'Korg Nautilus 61 Szintetizátor'),
(6,12,'Pearl Export Dobfelszerelés'),
(5,13,'Selmer Paris Tenor Szaxofon'),
(6,14,'Roland TD-17KVX Elektromos Dob'),
(7,15,'Kawai K-15 Akusztikus Zongora');

CREATE TABLE diakok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    telefonsz VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    szulDatum DATE NOT NULL,
    sajatHangszer VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO diakok (nev, telefonsz, email, szulDatum, sajatHangszer) VALUES
('Nagy Péter', '06701234501', 'nagy.peter@example.com', '2010-03-15', NULL),
('Kiss Anna', '06701234502', 'kiss.anna@example.com', '2009-07-22', 'Yamaha C40 Klasszikus Gitár'),
('Horváth Bence', '06701234503', 'horvath.bence@example.com', '2011-01-10', NULL),
('Tóth Lili', '06701234504', 'toth.lili@example.com', '2010-12-05', NULL),
('Szabó Dániel', '06701234505', 'szabo.daniel@example.com', '2008-06-18', 'Stentor Student II Hegedű'),
('Farkas Eszter', '06701234506', 'farkas.eszter@example.com', '2011-09-02', NULL),
('Molnár Dávid', '06701234507', 'molnar.david@example.com', '2009-11-25', NULL),
('Kerekes Réka', '06701234508', 'kerekes.reka@example.com', '2010-05-19', NULL),
('Varga Bálint', '06701234509', 'varga.balint@example.com', '2011-02-14', NULL),
('Sipos Nóra', '06701234510', 'sipos.nora@example.com', '2009-08-30', NULL);

CREATE TABLE tanarok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    telefonsz VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

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

CREATE TABLE tanar_mit_tud (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tanarId INT NOT NULL,
    kepesseg VARCHAR(255) NOT NULL,
    FOREIGN KEY (tanarId) REFERENCES tanarok(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO tanar_mit_tud (tanarId, kepesseg) VALUES
(1, 'Zongora tanár, zeneelmélet'),   -- Kovács Anna
(2, 'Énektanár - könnyűzene, pop'),  -- Szabó Dóra
(3, 'Hegedűtanár'),                   -- Tóth Emese
(4, 'Elektromos gitár tanár'),        -- Németh Gábor
(5, 'Dobtanár'),                      -- Kiss Réka
(6, 'Zongora tanár'),                 -- Kerekes Ádám
(7, 'Jazz ének tanár'),               -- Horváth Nóra
(8, 'Fuvola tanár'),                  -- Varga Petra
(9, 'Dobtanár');                      -- Sipos Bence

CREATE TABLE orak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tanarId INT NOT NULL,
    diakId INT NOT NULL,
    tema VARCHAR(255) NOT NULL,
    FOREIGN KEY (tanarId) REFERENCES tanarok(id) ON DELETE CASCADE,
    FOREIGN KEY (diakId) REFERENCES diakok(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO orak (tanarId, diakId, tema) VALUES
(1, 1, 'Zongora alapok'),            -- Kovács Anna tanítja Nagy Pétert
(1, 2, 'Skála gyakorlat'),           -- Kovács Anna tanítja Kiss Annát
(2, 3, 'Ének technika'),             -- Szabó Dóra tanítja Horváth Bencét
(3, 4, 'Hegedű posztúra'),           -- Tóth Emese tanítja Tóth Lilit
(4, 5, 'Elektromos gitár riffek'),   -- Németh Gábor tanítja Szabó Dánielt
(5, 6, 'Dob alapritmus'),            -- Kiss Réka tanítja Farkas Esztert
(6, 7, 'Zongora kíséret'),           -- Kerekes Ádám tanítja Molnár Dávidot
(7, 8, 'Jazz ének improvizáció'),    -- Horváth Nóra tanítja Kerekes Rékát
(8, 9, 'Fuvola hangtechnika'),       -- Varga Petra tanítja Varga Bálintot
(9, 10, 'Dob technika fejlesztés');  -- Sipos Bence tanítja Sipos Nórát

CREATE TABLE kolcsonzesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hangszerId INT NOT NULL,
    diakId INT NOT NULL,
    kolcsKezd TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    kolcsVeg DATE NOT NULL,
    megjegyzes TEXT,
    FOREIGN KEY (hangszerId) REFERENCES hangszerek(id) ON DELETE CASCADE,
    FOREIGN KEY (diakId) REFERENCES diakok(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsVeg, megjegyzes) VALUES
(1, 2, '2026-03-20', 'Első kölcsönzés'),   -- Kiss Anna kölcsönzi Yamaha C40 Klasszikus Gitárt
(2, 5, '2026-03-22', 'Hegedű gyakorlás'),  -- Szabó Dániel kölcsönzi Stentor Student II Hegedűt
(4, 1, '2026-03-25', NULL),                 -- Nagy Péter kölcsönzi Fender Stratocastert
(5, 7, '2026-03-30', 'Basszus alapok'),    -- Molnár Dávid kölcsönzi Fender Jazz Basst
(7, 9, '2026-04-02', NULL),                 -- Varga Bálint kölcsönzi Yamaha YAS-280 Szaxofont
(8, 2, '2026-04-05', 'Digitális zongora gyakorlás'), -- Kiss Anna Yamaha P-125
(10, 6, '2026-04-10', 'Dob gyakorlat'),    -- Farkas Eszter kölcsönzi Mapex Mars Akusztikus Dobot
(11, 1, '2026-04-12', 'Szintetizátor próba'), -- Nagy Péter Korg Nautilus
(14, 5, '2026-04-15', 'Elektronikus dob gyakorlás'), -- Szabó Dániel Roland TD-17KVX
(15, 8, '2026-04-20', 'Akusztikus zongora'); -- Kerekes Réka Kawai K-15

SET FOREIGN_KEY_CHECKS = 1;