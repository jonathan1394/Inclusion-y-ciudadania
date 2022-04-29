create database IyC_database;

use IyC_database;

create table users(
    id INI(11) no null PRIMARY KEY ,
    username varchar(16) not null,
    password varchar(40) not null,
);
