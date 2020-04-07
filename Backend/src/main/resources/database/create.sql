CREATE DATABASE `videoteka`;
USE `videoteka`;

CREATE TABLE `t_video` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `serial_no` VARCHAR(100) NOT NULL,
    `title` VARCHAR(500) NOT NULL,
    `acquisition_date` DATE NOT NULL,
    `status` ENUM('AVAILABLE', 'RENTED', 'DISCARDED') NOT NULL,

    CONSTRAINT pk_t_video PRIMARY KEY (`id`),
    CONSTRAINT u_t_video UNIQUE (`serial_no`)
);
