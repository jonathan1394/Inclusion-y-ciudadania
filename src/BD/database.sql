create database IyC_database;

use IyC_database

create table Educados(
    id int not null AUTO_INCREMENT PRIMARY KEY, 
    nombre varchar(40) not null,
    CI varchar(10), 
    sipi varchar(10), 
    fnac date, 
    prorroga varchar(100), 
    pei varchar(100), 
    rutafoto varchar(160),

);

select * from Educados;

INSERT into Educados values (1,"Jonathan Machad","49622524","12334","1333-12-12","FKDAJFÑLKAJDFLKJ","DKFJSKJFÑLDLÑKDFJÑKLA","");                                                    

SELECT COUNT(id) FROM Educados;