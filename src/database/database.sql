create database test;

\c test

create table users(
    id SERIAL PRIMARY KEY,
    nombre varchar (100),
    email varchar (100),
    passwrd varchar (100),
    stat varchar (10)
);

create table servicetypes(
    id SERIAL PRIMARY KEY,
    nombre varchar (100),
    detail varchar (200),
    stat varchar (10)
);

create table services(
    id SERIAL PRIMARY KEY,
    indications varchar (200),
    addr varchar (100),
    date_save timestamp,
    date_start timestamp,
    date_finish timestamp,
    id_technician int,
    id_type int,
    stat varchar (10),
    FOREIGN KEY(id_technician) REFERENCES users(id),
    FOREIGN KEY(id_type) REFERENCES servicetypes(id)
);

\dt

insert into servicetypes (nombre, detail, stat) values 
    ('Instalación', 'realizar una instalación de un nuevo soporte', 'A'),
    ('Reparación', 'reparar un soporte ya instalado', 'A');

insert into users (nombre, email, passwrd, stat) values
    ('ronaldo cuello', 'ronaldo.cuello@hotmail.com', '1111', 'A'),
    ('test user', 'test.user@email.com', '1111', 'A');






