create database IyC_database;

use IyC_database;


create table Area(
	Id int not null auto_increment primary key,
	Nombre varchar(90) NOT NULL,
    Valido bit(1)
);

Create table Educador(
	Id int not null auto_increment primary key,
    Nombre varchar(20) not null,
    Telefono varchar(10),
    F_Nac date,
    Valido bit(1)
);

CREATE TABLE casa (
  Id int NOT NULL AUTO_INCREMENT,
  Nombre varchar(30) NOT NULL,
  Direccion varchar(30) DEFAULT NULL,
  Telefono varchar(15) DEFAULT NULL,
  Foto varchar(50) DEFAULT NULL,
  Valido bit(1) DEFAULT NULL,
  PRIMARY KEY (Id)
);

create table Educado(
    Id int not null AUTO_INCREMENT PRIMARY KEY, 
    Nombre varchar(40) not null,
    Ci varchar(11), 
    Sipi varchar(10), 
    Fnac date, 
    Casa int,
    Rutafoto varchar(160),
	Valido bit(1),
	FOREIGN KEY (casa) REFERENCES casa(id)
);

create table ProEduIndi(
	Id int not null AUTO_INCREMENT PRIMARY KEY,
	AUX_EDUCADOR varchar(100),	
	Fecha date,
	Comentarios varchar(100),
	Educado int,
	FOREIGN KEY (Educado) REFERENCES Educado(Id)
); 

create table ProEduIniLinea(
	Id int not null AUTO_INCREMENT PRIMARY KEY,
	Id_Pro int,
	Area Varchar(100),
	Objetivoymeta text,
	AccionAcuerdo text,
	Plazo date,
	Resultados text,
	FOREIGN KEY (Id_pro) REFERENCES ProEduIndi(ID)
);








select * from Educado;
Select * from casa;
select * from Educador;
select * from Area;
select * from ProEduIndi as PEI, ProEduIniLinea as PEIL where PEIL.Id_pro=PEI.Id;
select Fecha,Area,Objetivoymeta,Accionacuerdo,Plazo, Resultados from ProEduIndi as PEI, ProEduIniLinea as PEIL where PEIL.Id_pro=PEI.Id;


insert into casa values (1,"Machado-1","Machado y Fernando Ortorbes","2209 2222","",1);
insert into casa values (2,"Machado-2","Machado y Fernando Ortorbes","2209 3333","",1);
insert into casa values (3, "Michellini", "Michelini xxx","2209 2222","",1); 


INSERT into Educado values (1,"Jonathan Machado","49622524","12334","1994-02-13",1,"",1);                                                    

insert into Educador (Id, Nombre,Telefono,F_Nac,Valido) values (1, "Lucia Gonzalez","099149230",'1994-02-13',1);

insert into Area values (1,'Red de vinculos afectivos y/o familiares',1);
insert into Area values (2,'Administracion y organizacion de ingresos y ahorros',1);
insert into Area values (3, 'Area laboral',1);
INSERT into Area values (4,'Convivencia y vida cotidiana',1);
insert into Area values (5, 'Educacion y formativa',1);
insert into Area values (6,'Salud',1);
insert into Area values (7,'Circulacion social y cultural',1);
insert into Area values (8, 'Proyeccion habitacional',1);

