-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 10:42 AM
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
  `Type` enum('Expense','Income') NOT NULL,
  `URL_Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryID`, `CategoryName`, `Type`, `URL_Image`) VALUES
(1, 'Lợi nhuận thu được', 'Income', 'icon_118.png'),
(2, 'Chuyển khoản đến', 'Income', 'icon_143.png'),
(3, 'Thu nhập khác', 'Income', 'ic_category_other_income.png'),
(4, 'Lương', 'Income', 'ic_category_salary.png'),
(5, 'Giáo dục', 'Expense', 'ic_category_education.png'),
(6, 'Thực phẩm & Đồ uống', 'Expense', 'ic_category_foodndrink.png'),
(7, 'Hóa đơn gas', 'Expense', 'icon_gas.png'),
(8, 'Quà tặng & Từ thiện', 'Expense', 'ic_category_donations.png'),
(9, 'Bảo trì nhà', 'Expense', 'icon_29.png'),
(10, 'Đồ dùng gia đình', 'Expense', 'icon_107.png'),
(11, 'Đầu tư', 'Expense', 'ic_category_invest.png'),
(12, 'Trang điểm', 'Expense', 'icon_63.png'),
(13, 'Chi phí khác', 'Expense', 'ic_category_other_expense.png'),
(14, 'Đồ dùng cá nhân', 'Expense', 'icon_persional.png'),
(15, 'Hóa đơn điện thoại', 'Expense', 'icon_134.png'),
(16, 'Bảo trì phương tiện', 'Expense', 'icon_130.png');

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `ExpenseID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`ExpenseID`, `UserID`, `CategoryID`, `Amount`, `Description`, `Date`) VALUES
(15, 9, 5, 800000.00, 'Đóng học phí tháng 9', '2024-09-05'),
(16, 9, 6, 150000.00, 'Ăn tối ngoài với gia đình', '2024-09-12'),
(17, 9, 7, 200000.00, 'Thanh toán hóa đơn gas', '2024-09-20'),
(18, 9, 8, 100000.00, 'Quà sinh nhật cho bạn bè', '2024-09-25'),
(19, 9, 13, 250000.00, 'Mua sắm không kế hoạch', '2024-10-02'),
(20, 9, 10, 400000.00, 'Trang trí nội thất', '2024-10-10'),
(21, 9, 15, 100000.00, 'Hóa đơn điện thoại tháng 10', '2024-10-18'),
(22, 9, 11, 1000000.00, 'Đầu tư quỹ mở', '2024-10-25'),
(23, 9, 14, 300000.00, 'Mua đồ cá nhân', '2024-11-05'),
(24, 9, 16, 150000.00, 'Bảo trì xe máy', '2024-11-12'),
(25, 9, 6, 250000.00, 'Ăn uống cuối tuần', '2024-11-18'),
(26, 9, 5, 900000.00, 'Đóng học phí tháng 11', '2024-11-20'),
(27, 10, 5, 700000.00, 'Học phí khóa tiếng Anh', '2024-09-10'),
(28, 10, 9, 500000.00, 'Sửa chữa mái nhà', '2024-09-15'),
(29, 10, 10, 200000.00, 'Mua rèm cửa mới', '2024-09-20'),
(30, 10, 6, 300000.00, 'Tổ chức tiệc tại nhà', '2024-10-05'),
(31, 10, 8, 200000.00, 'Quyên góp từ thiện', '2024-10-15'),
(32, 10, 15, 50000.00, 'Thanh toán hóa đơn điện thoại', '2024-10-20'),
(33, 10, 11, 2000000.00, 'Đầu tư cổ phiếu', '2024-10-25'),
(34, 10, 12, 80000.00, 'Mua sản phẩm làm đẹp', '2024-11-01'),
(35, 10, 13, 150000.00, 'Chi phí không dự kiến', '2024-11-10'),
(36, 10, 14, 500000.00, 'Mua đồ dùng cá nhân', '2024-11-15');

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `incomeID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`incomeID`, `UserID`, `CategoryID`, `Amount`, `Description`, `Date`) VALUES
(11, 9, 1, 5000000.00, 'Lợi nhuận từ kinh doanh', '2024-09-10'),
(12, 9, 4, 8000000.00, 'Lương tháng 9', '2024-09-30'),
(13, 9, 2, 1500000.00, 'Chuyển khoản từ bạn bè', '2024-10-05'),
(14, 9, 3, 3000000.00, 'Thu nhập từ dự án tự do', '2024-10-15'),
(15, 9, 1, 6000000.00, 'Lợi nhuận từ kinh doanh tháng 10', '2024-10-30'),
(16, 9, 4, 8500000.00, 'Lương tháng 11', '2024-11-05'),
(17, 9, 2, 2000000.00, 'Chuyển khoản gia đình hỗ trợ', '2024-11-20'),
(18, 10, 4, 7500000.00, 'Lương tháng 9', '2024-09-25'),
(19, 10, 1, 3000000.00, 'Lợi nhuận đầu tư chứng khoán', '2024-10-10'),
(20, 10, 3, 2500000.00, 'Thu nhập từ việc làm thêm', '2024-10-20'),
(21, 10, 2, 1200000.00, 'Chuyển khoản từ người thân', '2024-11-01'),
(22, 10, 4, 7800000.00, 'Lương tháng 11', '2024-11-30');

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
(9, 'nqphong.male1203@gmail.com', '$2a$10$dr66nayDYAvQz5hv225NJeUBsAEnqNEUcUnJ3pVc7Iw9ZGC.71skO', '2024-11-26 16:29:56'),
(10, '2251120232@ut.edu.vn', '$2a$10$jTC.PJNblKRS6yrrCQJaMuPOnkCW8WLxkin8r/AjtdfV2dlyp7N/C', '2024-11-26 16:30:23');

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
  MODIFY `ExpenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `income`
--
ALTER TABLE `income`
  MODIFY `incomeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
