-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2018 at 09:24 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maheshclinic`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `submitSurveyForm` (IN `r_name` VARCHAR(100), IN `r_email` VARCHAR(100), IN `r_sdate` DATE, IN `r_uid` INT)  BEGIN
    DECLARE db_email varchar(100);
    SET db_email=(select DISTINCT email from survey where email=r_email AND sdate>=       (select subdate(curdate(), interval 7 day)) and sdate<=curdate());
    select db_email;
    IF db_email = r_email THEN 
     SELECT 'duplicate submission';  
    ELSE
       insert into survey (name, email, sdate, uid) values (r_name , r_email,        r_sdate, r_uid);
    END IF;
    
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

CREATE TABLE `survey` (
  `sid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `sdate` date DEFAULT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `survey`
--

INSERT INTO `survey` (`sid`, `name`, `email`, `sdate`, `uid`) VALUES
(1, 'sangeeta', 'sangeeta@gmail.com', '2018-10-10', 2),
(2, 'rishi', 'rishi@gmail.com', '2018-10-11', 3),
(3, 'aparna', 'aparna@gmail.com', '2018-10-12', 4),
(4, 'sangeeta', 'sangeeta@gmail.com', '2018-10-16', 2),
(7, 'rishi', 'rishi@gmail.com', '2018-10-17', 3),
(8, 'aparna', 'aparna@gmail.com', '2018-10-17', 4),
(9, 'aparna', 'aparna@gmail.com', '2018-10-23', 4),
(10, 'sangeeta', 'sangeeta@gmail.com', '2018-10-23', 2),
(11, 'rishi', 'rishi@gmail.com', '2018-10-24', 3),
(14, 'rishi', 'rishi@gmail.com', '2018-10-31', 3),
(15, 'sangeeta', 'sangeeta@gmail.com', '2018-11-01', 2),
(16, 'aparna', 'aparna@gmail.com', '2018-11-01', 4),
(17, 'rishi', 'rishi@gmail.com', '2018-11-08', 3),
(18, 'rishi', 'rishi@gmail.com', '2018-11-08', 3),
(19, 'rishi', 'rishi@gmail.com', '2018-11-13', 3),
(20, 'khan', 'khan.abid.8800@outlook.com', '2018-11-13', 7),
(26, 'aparna', 'aparna@gmail.com', '2018-11-13', 4),
(28, 'sangeeta', 'sangeeta@gmail.com', '2018-11-14', 2),
(29, 'abid', 'khanabid844708@gmail.com', '2018-11-14', 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` enum('doctor','patient') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `password`, `type`) VALUES
(1, 'mahesh', 'mahesh@gmail.com', 'mahesh@123', 'doctor'),
(2, 'sangeeta', 'sangeeta@gmail.com', 'sangeeta@123', 'patient'),
(3, 'rishi', 'rishi@gmail.com', 'rishi@123', 'patient'),
(4, 'aparna', 'aparna@gmail.com', 'aparna@123', 'patient'),
(5, 'Sally', 'sally@gmail.com', 'bananas', 'doctor'),
(6, 'abid', 'khanabid844708@gmail.com', 'xyz', 'patient'),
(7, 'khan', 'khan.abid.8800@outlook.com', '123', 'patient'),
(8, 'shakir', 'shakir@gmail.com', 'khan@1234', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `survey`
--
ALTER TABLE `survey`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `survey`
--
ALTER TABLE `survey`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
