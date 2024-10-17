-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Oct 17, 2024 at 09:10 AM
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
(1, 'Lợi nhuận thu được', 'Income'),
(2, 'Chuyển khoản đến', 'Income'),
(3, 'Thu nhập khác', 'Income'),
(4, 'Lương', 'Income'),
(5, 'Giáo dục', 'Expense'),
(6, 'Thực phẩm & Đồ uống', 'Expense'),
(7, 'Hóa đơn gas', 'Expense'),
(8, 'Quà tặng & Từ thiện', 'Expense'),
(9, 'Bảo trì nhà', 'Expense'),
(10, 'Đồ dùng gia đình', 'Expense'),
(11, 'Đầu tư', 'Expense'),
(12, 'Trang điểm', 'Expense'),
(13, 'Chi phí khác', 'Expense'),
(14, 'Đồ dùng cá nhân', 'Expense'),
(15, 'Hóa đơn điện thoại', 'Expense'),
(16, 'Bảo trì phương tiện', 'Expense');

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `ExpenseID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `ExpenseDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`ExpenseID`, `UserID`, `CategoryID`, `Amount`, `Description`, `ExpenseDate`) VALUES
(1, 1, 5, 596.86, 'Học phí', '2024-10-01'),
(2, 2, 6, 248.43, 'Bữa tối ngoài', '2024-10-02'),
(3, 3, 7, 208.11, 'Mua xăng', '2024-10-03'),
(4, 1, 8, 146.69, 'Quà tặng cho bạn', '2024-10-04'),
(5, 2, 9, 161.70, 'Sửa chữa nhà', '2024-10-05'),
(6, 3, 10, 43.54, 'Nội thất mới', '2024-10-06'),
(7, 1, 11, 29.66, 'Đầu tư chứng khoán', '2024-10-07'),
(8, 2, 12, 26.66, 'Sản phẩm làm đẹp', '2024-10-08'),
(9, 3, 13, 117.26, 'Chi phí khác', '2024-10-09'),
(10, 1, 14, 15.49, 'Quần áo', '2024-10-10'),
(11, 2, 15, 39.90, 'Thanh toán hóa đơn điện thoại', '2024-10-11'),
(12, 3, 16, 14.14, 'Bảo trì xe', '2024-10-12'),
(13, 1, 5, 477.51, 'Học trực tuyến', '2024-10-13'),
(14, 2, 6, 175.93, 'Mua sắm thực phẩm', '2024-10-14'),
(15, 3, 7, 42.49, 'Thẻ giao thông công cộng', '2024-10-15'),
(16, 1, 8, 27.44, 'Quà tặng từ thiện', '2024-10-16'),
(17, 2, 9, 108.00, 'Chi phí vật nuôi', '2024-10-17'),
(18, 3, 10, 38.53, 'Dọn dẹp nhà cửa', '2024-10-18'),
(19, 1, 11, 171.38, 'Đầu tư vào cổ phiếu', '2024-10-19'),
(20, 2, 12, 207.49, 'Thành viên phòng gym', '2024-10-20'),
(21, 3, 13, 258.56, 'Chi phí khác', '2024-10-21');

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `incomeID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `IncomeDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`incomeID`, `UserID`, `CategoryID`, `Amount`, `Description`, `IncomeDate`) VALUES
(1, 1, 1, 2947.91, 'Lợi nhuận thu được', '2024-10-01'),
(2, 2, 2, 601.57, 'Chuyển khoản từ phụ huynh', '2024-10-02'),
(3, 3, 3, 1608.09, 'Thu nhập từ công việc phụ', '2024-10-03'),
(4, 1, 4, 2845.27, 'Lương tháng 10', '2024-10-04'),
(5, 2, 1, 1515.95, 'Tiền lãi từ tiết kiệm', '2024-10-05'),
(6, 3, 2, 1283.77, 'Công việc tự do', '2024-10-06'),
(7, 1, 3, 1489.57, 'Cổ tức', '2024-10-07'),
(8, 2, 4, 2889.94, 'Lương hàng tháng', '2024-10-08'),
(9, 3, 1, 2909.32, 'Thu nhập khác', '2024-10-09'),
(10, 1, 2, 174.93, 'Quà từ người thân', '2024-10-10'),
(11, 2, 3, 1318.25, 'Thưởng từ công việc', '2024-10-11'),
(12, 3, 4, 668.81, 'Hợp đồng tự do', '2024-10-12'),
(13, 1, 1, 2194.51, 'Lợi tức đầu tư', '2024-10-13'),
(14, 2, 2, 608.08, 'Thu nhập cho thuê', '2024-10-14'),
(15, 3, 3, 107.16, 'Di sản', '2024-10-15'),
(16, 1, 4, 3865.87, 'Lương tháng 11', '2024-10-16'),
(17, 2, 1, 3076.65, 'Phí tư vấn', '2024-10-17'),
(18, 3, 2, 4545.62, 'Hoa hồng', '2024-10-18'),
(19, 1, 3, 2184.47, 'Thu nhập từ kinh doanh phụ', '2024-10-19'),
(20, 2, 4, 1805.54, 'Thưởng hàng tháng', '2024-10-20'),
(21, 3, 1, 3890.40, 'Công việc bán thời gian', '2024-10-21');

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
(1, 'nqphong.male1203@gmail.com', '$2a$10$xDIg61.GtnYt4IVmcmG/xu0XB4ZPmuiO7E4NT38FCcC5FhHnPIifa', '2024-10-08 21:46:26'),
(2, '2251120232@gmail.com', '$2a$10$7FaXj7NDya4xnXaw0GulhevuEeiXhD6ZCZ1GRvGBdRSu1qUp25VxC', '2024-10-11 20:42:47'),
(3, 'nqphong.male120311111@gmail.com', '$2a$10$GiRbqe4fdjoYV.vskA1R3OcaxsfM8CDKl7sld2Ebh7rSYAqdIGuIa', '2024-10-11 20:47:54'),
(6, 'nqphong.male12031111@gmail.com', '$2a$10$IDtorKb4A99zG0RC0axwFeUuLb45a8puz93qZpQ/2IG7mpOvGXwd6', '2024-10-12 10:32:25');

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
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`incomeID`),
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
  MODIFY `ExpenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Constraints for table `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `income_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `income_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
