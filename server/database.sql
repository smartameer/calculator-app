/**
 * Calculator
 * @author: smartameer
 */

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE `calculator` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `calculator`;

CREATE TABLE IF NOT EXISTS `calculator_data` (
  `id` enum('1') NOT NULL,
  `input1` INT NOT NULL,
  `input2` INT NOT NULL,
  `result` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

