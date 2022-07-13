create database IyC_database;

use IyC_database;

create table ProEduIndi(
	Id int not null AUTO_INCREMENT PRIMARY KEY,
	AUX_EDUCADOR varchar(100),
	Fecha date,
	Comentarios varchar(100)
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

create table Educado(
    Id int not null AUTO_INCREMENT PRIMARY KEY, 
    Nombre varchar(40) not null,
    Ci varchar(11), 
    Sipi varchar(10), 
    Fnac date, 
    Prorroga varchar(100),
    Casa int,
    PEI int,
    Rutafoto varchar(160),
	Valido bit(1),
	FOREIGN KEY (PEI) REFERENCES ProEduIndi(Id),
	FOREIGN KEY (casa) REFERENCES casa(id)
);


create table Area(
	Id int not null auto_increment primary key,
    Nombre varchar(30) not null,
    Direccion varchar(30) not null,
    Telefono varchar(15),
    Foto varchar(50),
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


select * from educado;
Select * from casa;
select * from Educador;
select * from ProEduIndi as PEI, ProEduIniLinea as PEIL where PEIL.Id_pro=PEI.Id;

INSERT into educado values (1,"Jonathan Machado","49622524","12334","1994-02-13","FKDAJFÑLKAJDFLKJ",1,"",1);                                                    

insert into Educador (Id, Nombre,Telefono) values (1, "Lucia Gonzalez","099149230");


insert into casa values (1,"Machado-1","Machado y Fernando Ortorbes","2209 2222","",1);
insert into casa values (2,"Machado-2","Machado y Fernando Ortorbes","2209 3333","",1);
insert into casa values (3, "Michellini", "Michelini xxx","2209 2222","",1); 

UPDATE educado SET Valido = 1 where id=1;


UPDATE Educador SET F_Nac = '1994-02-13' where Id=3;