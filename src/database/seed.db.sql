ALTER SEQUENCE Zaposlenik_idZaposlenik_seq RESTART WITH 1;
ALTER SEQUENCE Smjena_idSmjena_seq RESTART WITH 1;
ALTER SEQUENCE Odgajatelj_idOdgajatelj_seq RESTART WITH 1;
ALTER SEQUENCE ClanUprava_idClanUprava_seq RESTART WITH 1;
ALTER SEQUENCE Voditelj_idVoditelj_seq RESTART WITH 1;


INSERT INTO Smjena(naziv, vrijemePocetak, vrijemeZavrsetak) VALUES
('jutarnja','08:00:00', '16:00:00'),
('međusmjena','12:00:00','20:00:00'),
('popodnevna','16:00:00','23:59:59');

INSERT INTO Zaposlenik(ime, oib, prezime, datumRodenja, datumZaposlenja, spol, email, lozinka) VALUES
('Marija', 12586958231, 'Tolić','02/05/1989','03/03/2021','f','marija.tolic@gmail.com','-'),
('Josipa', 13585958222, 'Perić','02/05/1993','03/03/2020','f','josipa.peric@gmail.com','-'),
('Maja', 11516968297, 'Matić','02/05/1973','03/03/2020','f','maja.matic@gmail.com','-'),
('Antonela', 14585956795, 'Jadranić','02/05/1995','03/03/2019','f','antonela.jadranic@gmail.com','-'),
('Tin', 14186258392, 'Ivančić','02/05/1966','03/03/2018','m','tin.ivancic@gmail.com','-'),
('Ivana', 15526128314, 'Marinović','02/05/1999','03/03/2016','f','ivana.marinovic@gmail.com','-'),
('Petra', 78386912312, 'Josipović','02/05/1976','03/03/2018','f','petra.josipovic@gmail.com','-'),
('Ivica', 24586965231, 'Papić','02/05/1988','02/07/2015','m','ivica.papic@gmail.com','-');

INSERT INTO Odgajatelj(idZaposlenik) VALUES
(1),
(2),
(3),
(4),
(6);

INSERT INTO ClanUprava(idZaposlenik) VALUES
(5),
(7);

INSERT INTO Voditelj(idZaposlenik) VALUES
(8);

INSERT INTO Grupa(datumOsnivanja, naziv, idOdgajatelj) VALUES
('08/04/2022', 'Leptiri', 1),
('02/02/2022', 'Kmečavci', 2),
('01/02/2022', 'Pčelice', 3);

INSERT INTO Dijete(oib, ime, prezime, datumRodenja, idGrupa) VALUES
(12586958231, 'Ivan', 'Petrić', '03/12/2017',1),
(22531458527, 'Josip', 'Brzoja', '04/25/2019',1),
(22186931432, 'Marko', 'Dodik', '11/28/2018',2),
(21916958233, 'Luka', 'Martić', '05/05/2019',3),
(72842382621, 'Antonio', 'Sabljić', '03/12/2019',3),
(53426951122, 'Pero', 'Perić', '05/02/2018', 2);


INSERT INTO Bolest(naziv) VALUES
('Alergija na kikiriki'),
('Intolerancija na laktozu'),
('Alergija na pelud'),
('Alergija na gluposti'),
('Alergija na dosadne odgajatelje');

INSERT INTO DijeteBolest(idDijete, idBolest) VALUES
(1,1),
(1,2),
(3,3),
(4,2);

INSERT INTO Izlet(naziv, vrijemePocetak, vrijemeZavrsetak) VALUES
('Odlazak u gradsku knjižnicu', '06/06/2022 12:45:00', '06/06/2022 16:45:00'),
('Odlazak u kazalište Dubrava', '07/07/2022 09:00:00', '07/07/2022 13:00:00');

INSERT INTO GrupaIzlet(idGrupa, idIzlet) VALUES
(1,1),
(3,1);

INSERT INTO Izostanak(idDijete, idIzlet, objasnjenje) VALUES
(1,1,'Planirano vrijeme završetka je prekasno za roditelja.'),
(2,1, 'Dijete dolazi u vrtić oko 10 sati u vrtiću, dok je planirano vrijeme polaska 9 sati.');

INSERT INTO Mjesto(postanskiBroj, naziv) VALUES
(10040, 'Zagreb - Dubrava'),
(10290, 'Zaprešić'),
(10010, 'Buzin'),
(10360, 'Sesvete'),
(10000, 'Zagreb');

INSERT INTO ZaposlenikZiviU(idZaposlenik, postanskiBroj, adresa) VALUES
(1, 10040, 'Ulica Platana 4'),
(2, 10040, 'Ulica Topola 1'),
(3, 10360, 'Selska ulica 2B'),
(4, 10000, 'Unska ulica 3');

INSERT INTO DijeteZiviU(idDijete, postanskiBroj, adresa) VALUES
(1, 10040, 'Aleja lipa 2H'),
(2, 10040, 'Aleja javora 4A'),
(3, 10040, 'Sitnice ulica 12'),
(4, 10360, 'Trg Dragutina Domjanića 12');

INSERT INTO Placa(datum, netoIznos, brutoIznos, idZaposlenik) VALUES
('05-02-2022', 7000, 12000, 1),
('05-02-2022', 7000, 12000, 2),
('05-02-2022', 7000, 12000, 3),
('05-02-2022', 7000, 12000, 4),
('05-02-2022', 7000, 12000, 5),
('05-03-2022', 7000, 12000, 1),
('05-03-2022', 7000, 12000, 2),
('05-03-2022', 7000, 12000, 3),
('05-03-2022', 7000, 12000, 4),
('05-03-2022', 7000, 12000, 5);


INSERT INTO Placanje(datum, iznos, idDijete) VALUES
('05-02-2022', 1000, 1),
('05-02-2022', 1000, 2),
('05-02-2022', 1000, 3),
('05-02-2022', 1000, 4),
('05-02-2022', 1000, 5),
('05-03-2022', 1000, 1),
('05-03-2022', 1000, 2),
('05-03-2022', 1000, 3),
('05-03-2022', 1000, 4),
('05-03-2022', 1000, 5);

INSERT INTO ZaposlenikSmjena (idSmjena, idZaposlenik, datum) VALUES
(1,1,'05-10-2022'),
(1,2,'05-10-2022'),
(1,3,'05-10-2022'),
(1,4,'05-10-2022'),
(2,5,'05-10-2022'),
(2,6,'05-10-2022'),
(2,7,'05-10-2022'),
(2,8,'05-10-2022');