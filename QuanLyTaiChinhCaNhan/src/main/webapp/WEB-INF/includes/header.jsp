<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
<link rel="stylesheet" href="assets/css/header.css">
</head>
<body>
	<nav>
		<div class="sidebar">
			<a class="menu-item active" href="index.jsp"> <i
				class="fas fa-file-alt"></i> Sổ giao dịch
			</a> <a class="menu-item" href="report"> <i class="fas fa-chart-bar"></i>
				Báo cáo
			</a> <a class="menu-item" href="#"> <i class="fas fa-wallet"></i>
				Ngân sách
			</a> <a class="menu-item" href="#"> <i class="fas fa-question-circle"></i>
				Trợ giúp
			</a>
		</div>
		<div class="header">
			<div class="user-info">
				<img alt="User Avatar"
					src="https://storage.googleapis.com/a1aa/image/rsKzFeIQXA0aGiDTVe4khscIXuI1O9vmq1dyHeO7Yx7IC5FnA.jpg" />
				<span> Tiền mặt - 19,645,000.00 </span>
			</div>
			<div class="actions">
				<button id="btn-search" onclick="searchButton.openButton() "><i class="fas fa-search"></i></button>

				<button id="btn-addTransaction" onclick="addTransaction.openButton()">THÊM
					GIAO DỊCH</button>
				<script src="assets/js/button.js"></script>
			</div>
		</div>
	</nav>
</body>
</html>
