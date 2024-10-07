<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Báo cáo tài chính</title>
<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: Arial, Helvetica, sans-serif;
	
}

.content {
	padding: 20px;
	width: 50%; /* Adjusted to take more width */
	margin-top: 20px; /* Space between header and content */
	margin-left: 500px;
}

.header-content,.chart-container {
	display: flex;
	justify-content: space-around;
	background-color: #fff;
	padding: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	
}
.income, .outcome {
	text-align: center;
}

.title {
	display: block;
	margin-bottom: 5px;
	font-size: 16px;
	font-weight: bold;
}
.chart-container h1{
text-align: center;
}
.positive {
	color: #4caf50;
}

.negative {
	color: #f44336;
}

.amount {
	font-size: 16px;
	font-weight: bold;
}
</style>
</head>
<body>
	<%@ include file="/WEB-INF/includes/header.jsp"%>
	<div class="content">
		<div class="header-content">
			<div class="income">
				<div class="title">Thu Nhập</div>
				<span class="amount positive">+698,626,843.72 đ</span>
			</div>
			<div class="outcome">
				<div class="title">Chi Tiêu</div>
				<span class="amount positive">+698,626,843.72 đ</span>
			</div>
		</div>
		<div class="container">
			<div class="chart-container">
			<div>
			<h1>Khoản Thu</h1>
			 <canvas id="revenueChart"></canvas>
			</div>
			<div>
			<h1>Khoản Chi</h1>
			<canvas id="expenseChart"></canvas>
			</div>
			</div>
		</div>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	<script src="assets/js/chart.js"></script>
</body>
</html>
