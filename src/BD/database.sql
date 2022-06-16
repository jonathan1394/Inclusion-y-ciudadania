create database IyC_database;

use IyC_database

create table ProEduIndi(
	Id int not null AUTO_INCREMENT PRIMARY KEY,
	AUX_EDUCADOR varchar(100),
	Fecha date,
	Comentarios varchar(100)
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
select * from Educados;

INSERT into Educados values (1,"Jonathan Machad","49622524","12334","1333-12-12","FKDAJFÑLKAJDFLKJ","DKFJSKJFÑLDLÑKDFJÑKLA","");                                                    

SELECT COUNT(id) FROM Educados;