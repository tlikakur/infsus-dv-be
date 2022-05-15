CREATE TABLE Zaposlenik
(
  idZaposlenik SERIAL NOT NULL,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(50) NOT NULL,
  datumRodenja DATE NOT NULL CHECK (AGE(now()::DATE, datumRodenja) >= '18 years'),
  datumZaposlenja DATE NOT NULL,
  oib NUMERIC(11) NOT NULL,
  spol VARCHAR(1) NOT NULL,
  email VARCHAR(50) NOT NULL,
  lozinka VARCHAR(256) NOT NULL,
  PRIMARY KEY (idZaposlenik),
  UNIQUE(email)
);

CREATE TABLE Odgajatelj
(
  idOdgajatelj SERIAL NOT NULL,
  idZaposlenik INT NOT NULL,
  PRIMARY KEY (idOdgajatelj),
  FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik) ON DELETE CASCADE
);

CREATE TABLE Grupa
(
  idGrupa SERIAL NOT NULL,
  datumOsnivanja DATE NOT NULL,
  naziv VARCHAR(50) NOT NULL,
  idOdgajatelj INT NOT NULL,
  PRIMARY KEY (idGrupa),
  FOREIGN KEY (idOdgajatelj) REFERENCES Odgajatelj(idOdgajatelj),
  UNIQUE(naziv)
);

CREATE TABLE Dijete
(
  idDijete SERIAL NOT NULL,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(50) NOT NULL,
  oib NUMERIC(11) NOT NULL,
  datumRodenja DATE NOT NULL CHECK (AGE(now()::DATE, datumRodenja) BETWEEN '0 years' AND '6 years'),
  idGrupa INT NOT NULL,
  PRIMARY KEY (idDijete),
  FOREIGN KEY (idGrupa) REFERENCES Grupa(idGrupa)
);

CREATE TABLE Smjena
(
  idSmjena SERIAL NOT NULL,
  naziv VARCHAR(50) NOT NULL,
  vrijemePocetak TIME NOT NULL,
  vrijemeZavrsetak TIME NOT NULL,
  PRIMARY KEY (idSmjena),
  UNIQUE(naziv),
  CHECK(vrijemePocetak < vrijemeZavrsetak)
);

CREATE TABLE ClanUprava
(
  idClanUprava SERIAL NOT NULL,
  idZaposlenik INT NOT NULL,
  PRIMARY KEY (idClanUprava),
  FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik) ON DELETE CASCADE
);

CREATE TABLE ZaposlenikSmjena
(
  idSmjena INT NOT NULL,
  idZaposlenik INT NOT NULL,
  datum DATE NOT NULL,
  PRIMARY KEY (datum, idZaposlenik),
  FOREIGN KEY (idSmjena) REFERENCES Smjena(idSmjena) ON DELETE CASCADE,
  FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik) ON DELETE CASCADE
);

CREATE TABLE Izlet
(
  idIzlet SERIAL NOT NULL,
  naziv VARCHAR(100) NOT NULL,
  vrijemePocetak TIMESTAMP NOT NULL,
  vrijemeZavrsetak TIMESTAMP NOT NULL,
  PRIMARY KEY (idIzlet),
  UNIQUE(naziv),
  CHECK(vrijemePocetak <= vrijemeZavrsetak)
);

CREATE TABLE Bolest
(
  idBolest SERIAL NOT NULL,
  naziv VARCHAR(50) NOT NULL,
  PRIMARY KEY (idBolest),
  UNIQUE(naziv)
);

CREATE TABLE Izostanak
(
  objasnjenje VARCHAR(100) NOT NULL,
  idDijete INT NOT NULL,
  idIzlet INT NOT NULL,
  PRIMARY KEY (idDijete, idIzlet),
  FOREIGN KEY (idDijete) REFERENCES Dijete(idDijete),
  FOREIGN KEY (idIzlet) REFERENCES Izlet(idIzlet) ON DELETE CASCADE
);

CREATE TABLE Mjesto
(
  postanskiBroj INT NOT NULL,
  naziv VARCHAR(50) NOT NULL,
  PRIMARY KEY (postanskiBroj),
  UNIQUE(naziv)
);

CREATE TABLE dijeteZiviU
(
  adresa VARCHAR(50) NOT NULL,
  postanskiBroj INT NOT NULL,
  idDijete INT NOT NULL,
  PRIMARY KEY (idDijete),
  FOREIGN KEY (postanskiBroj) REFERENCES Mjesto(postanskiBroj),
  FOREIGN KEY (idDijete) REFERENCES Dijete(idDijete)
);

CREATE TABLE zaposlenikZiviU
(
  adresa VARCHAR(50) NOT NULL,
  postanskiBroj INT NOT NULL,
  idZaposlenik INT NOT NULL,
  PRIMARY KEY (idZaposlenik),
  FOREIGN KEY (postanskiBroj) REFERENCES Mjesto(postanskiBroj),
  FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik)
);

CREATE TABLE Placa
(
  idPlaca SERIAL NOT NULL,
  datum DATE NOT NULL,
  netoIznos FLOAT NOT NULL,
  brutoIznos FLOAT NOT NULL,
  idZaposlenik INT NOT NULL,
  PRIMARY KEY (idPlaca),
  FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik)
);

CREATE TABLE Placanje
(
  idPlacanje SERIAL NOT NULL,
  datum DATE NOT NULL,
  iznos FLOAT NOT NULL,
  idDijete INT NOT NULL,
  PRIMARY KEY (idPlacanje),
  FOREIGN KEY (idDijete) REFERENCES Dijete(idDijete)
);

CREATE TABLE Voditelj
(
  idVoditelj SERIAL NOT NULL,
  idZaposlenik INT NOT NULL,
  PRIMARY KEY (idVoditelj),
  FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik) ON DELETE CASCADE
);

CREATE TABLE GrupaIzlet
(
  idGrupa INT NOT NULL,
  idIzlet INT NOT NULL,
  PRIMARY KEY (idGrupa, idIzlet),
  FOREIGN KEY (idGrupa) REFERENCES Grupa(idGrupa) ON DELETE CASCADE,
  FOREIGN KEY (idIzlet) REFERENCES Izlet(idIzlet) ON DELETE CASCADE
);

CREATE TABLE DijeteBolest
(
  idDijete INT NOT NULL,
  idBolest INT NOT NULL,
  PRIMARY KEY (idDijete, idBolest),
  FOREIGN KEY (idDijete) REFERENCES Dijete(idDijete) ON DELETE CASCADE,
  FOREIGN KEY (idBolest) REFERENCES Bolest(idBolest)
);