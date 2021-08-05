CREATE DATABASE vvU6Km6Xaf;
USE vvU6Km6Xaf;
CREATE TABLE users (
	id mediumint not null auto_increment,
    firstName varchar(32) not null,
    lastName varchar(32) not null,
    document varchar(16) not null,
    address varchar(64) not null,
    phone int(10) not null,
    email varchar(32) not null,
    primary key (id)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE users
ADD UNIQUE document (document);

insert into users(firstName,lastName,document,address,phone,email)
values ('Vilma','Gómez', 313233, 'Av 39 # 2129', 300214578, 'vilma@correo.com');

