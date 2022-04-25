-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.28 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_personal
CREATE DATABASE IF NOT EXISTS `db_personal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_personal`;

-- Dumping structure for table db_personal.inventario
CREATE TABLE IF NOT EXISTS `inventario` (
  `id_inventario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `unidad` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_inventario`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que contendrá el inventario de la empresa.';

-- Dumping data for table db_personal.inventario: ~11 rows (approximately)
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
REPLACE INTO `inventario` (`id_inventario`, `nombre`, `cantidad`, `unidad`) VALUES
	(2, 'Memoria RAM', 1500, 'DIFA'),
	(3, 'CPU', 9999, 'DIFA'),
	(4, 'Pantalla', 10, 'DIFA'),
	(5, 'Robot', 10, 'DIFA'),
	(6, 'RaspBerry', 10, 'DIFA'),
	(7, 'Telefono', 10, 'DIFA'),
	(8, 'Raton', 15, 'DIFA'),
	(88, 'Pantalla LCD', 500, 'DIFA'),
	(111, 'Clavo', 1000, 'DIFA'),
	(112, 'Reloj', 2500, 'DIFA');
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;

-- Dumping structure for table db_personal.persona
CREATE TABLE IF NOT EXISTS `persona` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  PRIMARY KEY (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_personal.persona: ~6 rows (approximately)
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
REPLACE INTO `persona` (`id_persona`, `nombre`, `apellido`, `correo`) VALUES
	(1, 'Cristian', 'Virago', 'cristian.viragor@gmail.com'),
	(2, 'prueba01', 'prueba01', 'prueba01@gmail.com'),
	(3, 'prueba02', 'prueba02', 'prueba02@gmail.com'),
	(4, 'Juancho', 'Virago', 'juancho@gmail.com'),
	(5, 'Juanjo', 'Rivera', 'juanjo@gmail.com'),
	(7, 'Alex', 'Mellado', 'mellado@gmail.com');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;

-- Dumping structure for table db_personal.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_personal.sessions: ~5 rows (approximately)
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
REPLACE INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('JqfZYrHbGshYBxxXjNmsdl9zcXEadAc0', 1650950348, '{"cookie":{"originalMaxAge":86400000,"expires":"2022-04-26T19:15:49.520Z","httpOnly":false,"path":"/"},"id_user":5,"user":"Carolina Andrea","email":"carolina@gmail.com","id_role":"admin"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- Dumping structure for table db_personal.users
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_role` varchar(20) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_personal.users: ~15 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id_user`, `user`, `email`, `password`, `id_role`) VALUES
	(1, 'Administrador', 'admin@gmail.com', '$2a$08$kDEXRAtrtaZjtBiOWRvTXuA7Nmq0.hyB8p6jdfboOeSdYCWORn.zm', 'admin'),
	(2, 'Usuario', 'user@gmail.com', '$2a$08$upc0K2cJWQtMTRlNVhwH5.jP/WnLUmIpaRZddUk2gLJOqbfiLUoSy', 'user'),
	(3, 'Victor Manuel', 'victor@gmail.com', '$2a$08$G3.FQAdVVp5vgnoh7BDqveL4X5ClpHKyMx093QkVizJUKxKOpxgXC', 'admin'),
	(4, 'Felipe Maximiliano', 'felipe@gmail.com', '$2a$08$mxJC5YZE5eAFQlfDCrn7ZuMeHewuB47HHt6bP8YCbeSNxWdSUUg7S', 'admin'),
	(5, 'Carolina Andrea', 'carolina@gmail.com', '$2a$08$lHSfaHT6IWqgzUC0VsrWxu.dyAbOj56a9f3WO5SOmsIGp0fY6uPia', 'admin'),
	(6, 'Ricardos', 'valdivia@gmail.com', '$2a$08$SQQr2FFwwapU2GcCLMdnBerI81a6hl35ym4.Iv1.N/SUWMEGVJ6FW', 'user'),
	(7, 'Ricardo Valdivia', 'ricardov@gmail.com', '$2a$08$jVnWyKGA2VXTEulfum61ZO2tdkWqvLFpn.eWGzSWy07PHHPN8P5hK', 'user'),
	(9, 'John', 'salchichon@gmail.com', '$2a$08$h2lCiEOk9qWlVlcGIM5SFO25FdzIn0KUMOHbx/inHZ//tKxSTh43S', 'user'),
	(10, 'Ginno', 'ginno@gmail.com', '$2a$08$5jMh21L.gRjKpNS2lrIFiujs0Yr/s0yzn5lmpscShTF3JEgfB6SFC', 'admin'),
	(11, 'Victor Moran', 'moran@gmail.com', '$2a$08$6qvxjAr0rHrL2WASKjchMe8nrNK0VburQrgotXX.1bP4OBQyzUene', 'admin'),
	(12, 'Janet', 'janet@gmail.com', '$2a$08$WNX55/.y6j1gxVVem1J.xumwnOeib7jALDWW1ckOiAhR2S/UPew4e', 'admin'),
	(13, 'Carlos', 'carlos@gmail.com', '$2a$08$0QY1/DAQ4x7.QaBxbnKituviFK51NAyPbyikAFMixH6zNHjXLuLhq', 'user'),
	(14, 'Calderon', 'calderon@gmail.com', '$2a$08$DszYSwb5g5JEqYrxSv61.e/G29MHG3phuVFrpYqDEV9sDPmcj.g/O', 'user'),
	(15, 'Cristian Zabala', 'zabala@gmail.com', '$2a$08$741KVdJ8o9eHLoW1smXWoef0cL69vS6iou8hrawctjG15SYTwTZrm', 'user'),
	(16, 'socio', 'socito@gmail.com', '$2a$08$KVLEkHIlbQ4qGdNpG0Ofa.1LYlpN7.bEyR1of36tUPEmCkBbG/vF6', 'admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
