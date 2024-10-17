-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Oct 07, 2024 at 05:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlychitieu`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL,
  `Type` enum('Expense','Income') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryID`, `CategoryName`, `Type`) VALUES
(1, 'Collect Interest', 'Income'),
(2, 'Incoming Transfer', 'Income'),
(3, 'Other Income', 'Income'),
(4, 'Salary', 'Income'),
(5, 'Education', 'Expense'),
(6, 'Food & Beverage', 'Expense'),
(7, 'Gas Bill', 'Expense'),
(8, 'Gifts & Donations', 'Expense'),
(9, 'Home Maintenance', 'Expense'),
(10, 'Houseware', 'Expense'),
(11, 'Investment', 'Expense'),
(12, 'Makeup', 'Expense'),
(13, 'Other Expense', 'Expense'),
(14, 'Personal Items', 'Expense'),
(15, 'Phone Bill', 'Expense'),
(16, 'Vehicle Maintenance', 'Expense');

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `ExpenseID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Decription` varchar(255) DEFAULT NULL,
  `ExpenseDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `imcome`
--

CREATE TABLE `imcome` (
  `ImcomeID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Decription` varchar(255) DEFAULT NULL,
  `ImcomeDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `CreateAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Email`, `PasswordHash`, `CreateAt`) VALUES
(1, 'nqphong.male1203@gmail.com', '123', '2024-10-07 11:37:51'),
(9, 'asdfasf@gmail.com', '123', '2024-10-07 11:55:17'),
(10, 'asdasdfafasf@gmail.com', '123', '2024-10-07 11:56:17'),
(11, 'asfasdfasdffasfd@gmail.com', '124345234', '2024-10-07 11:56:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`ExpenseID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `imcome`
--
ALTER TABLE `imcome`
  ADD PRIMARY KEY (`ImcomeID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `expense`
--
ALTER TABLE `expense`
  MODIFY `ExpenseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `imcome`
--
ALTER TABLE `imcome`
  MODIFY `ImcomeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expense`
--
ALTER TABLE `expense`
  ADD CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `expense_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);

--
-- Constraints for table `imcome`
--
ALTER TABLE `imcome`
  ADD CONSTRAINT `imcome_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `imcome_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
