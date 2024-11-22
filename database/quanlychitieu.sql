-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 22, 2024 lúc 10:49 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlychitieu`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL,
  `Type` enum('Expense','Income') NOT NULL,
  `URL_Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
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
-- Cấu trúc bảng cho bảng `expense`
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
-- Đang đổ dữ liệu cho bảng `expense`
--

INSERT INTO `expense` (`ExpenseID`, `UserID`, `CategoryID`, `Amount`, `Description`, `Date`) VALUES
(1, 1, 5, 500000.00, 'Học phí tháng 9', '2024-09-05'),
(2, 2, 6, 200000.00, 'Bữa ăn ngoài', '2024-09-12'),
(3, 3, 7, 150000.00, 'Hóa đơn gas tháng 9', '2024-09-20'),
(4, 1, 8, 100000.00, 'Quà tặng cho bạn', '2024-09-25'),
(5, 2, 9, 300000.00, 'Sửa chữa nhà', '2024-10-02'),
(6, 3, 10, 100000.00, 'Mua đồ dùng gia đình', '2024-10-10'),
(7, 1, 11, 500000.00, 'Đầu tư vào chứng khoán', '2024-10-15'),
(8, 2, 12, 70000.00, 'Sản phẩm làm đẹp', '2024-10-18'),
(9, 3, 13, 120000.00, 'Chi phí khác', '2024-10-22'),
(10, 1, 14, 250000.00, 'Đồ dùng cá nhân', '2024-11-01'),
(11, 2, 15, 50000.00, 'Hóa đơn điện thoại tháng 11', '2024-11-05'),
(12, 3, 16, 100000.00, 'Bảo trì phương tiện', '2024-11-12'),
(13, 1, 5, 600000.00, 'Học phí tháng 11', '2024-11-15'),
(14, 2, 6, 300000.00, 'Mua thực phẩm', '2024-11-20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `income`
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
-- Đang đổ dữ liệu cho bảng `income`
--

INSERT INTO `income` (`incomeID`, `UserID`, `CategoryID`, `Amount`, `Description`, `Date`) VALUES
(1, 1, 1, 2000000.00, 'Lợi nhuận từ kinh doanh tháng 9', '2024-09-10'),
(2, 2, 2, 1000000.00, 'Chuyển khoản từ gia đình', '2024-09-15'),
(3, 3, 3, 1500000.00, 'Thu nhập khác', '2024-09-20'),
(4, 1, 4, 3000000.00, 'Lương tháng 10', '2024-10-05'),
(5, 2, 1, 1000000.00, 'Lãi từ đầu tư', '2024-10-10'),
(6, 3, 2, 1200000.00, 'Thu nhập từ dự án tự do', '2024-10-15'),
(7, 1, 3, 2000000.00, 'Cổ tức tháng 10', '2024-10-22'),
(8, 2, 4, 3500000.00, 'Lương tháng 11', '2024-11-05'),
(9, 3, 1, 1500000.00, 'Thu nhập khác', '2024-11-12'),
(10, 1, 2, 500000.00, 'Chuyển khoản từ bạn bè', '2024-11-18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `CreateAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`UserID`, `Email`, `PasswordHash`, `CreateAt`) VALUES
(1, 'nqphong.male1203@gmail.com', '$2a$10$xDIg61.GtnYt4IVmcmG/xu0XB4ZPmuiO7E4NT38FCcC5FhHnPIifa', '2024-10-08 21:46:26'),
(2, '2251120232@gmail.com', '$2a$10$7FaXj7NDya4xnXaw0GulhevuEeiXhD6ZCZ1GRvGBdRSu1qUp25VxC', '2024-10-11 20:42:47'),
(3, 'nqphong.male120311111@gmail.com', '$2a$10$GiRbqe4fdjoYV.vskA1R3OcaxsfM8CDKl7sld2Ebh7rSYAqdIGuIa', '2024-10-11 20:47:54'),
(6, 'nqphong.male12031111@gmail.com', '$2a$10$IDtorKb4A99zG0RC0axwFeUuLb45a8puz93qZpQ/2IG7mpOvGXwd6', '2024-10-12 10:32:25'),
(8, 'test@test', '1', '2024-10-21 15:47:00');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Chỉ mục cho bảng `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`ExpenseID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Chỉ mục cho bảng `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`incomeID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `expense`
--
ALTER TABLE `expense`
  MODIFY `ExpenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `income`
--
ALTER TABLE `income`
  MODIFY `incomeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `expense`
--
ALTER TABLE `expense`
  ADD CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `expense_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);

--
-- Các ràng buộc cho bảng `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `income_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `income_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
