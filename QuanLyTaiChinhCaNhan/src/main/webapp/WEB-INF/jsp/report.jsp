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
	width: 50%;
	margin: 20px auto;
}

.header-content, .chart-container {
	display: flex;
	justify-content: center;
	gap: 20px;
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

.chart-container h1 {
	text-align: center;
}

.positive {
	color: #4caf50;
}

.negative {
	color: #f44336;
}

.amount {
	font-size: 18px;
	font-weight: bold;
	margin-top: 10px;
}

.chart-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 30px;
}

.chart-container canvas {
	max-width: 400px;
}
</style>
</head>
<body>

	<%@ include file="/WEB-INF/includes/header.jsp"%>

	<%
	java.time.LocalDate currentDate = java.time.LocalDate.now();

	// Lấy tháng và năm hiện tại
	String currentMonthYear = currentDate.getMonthValue() + "/" + currentDate.getYear();

	// Lấy tháng và năm trước
	String lastMonthYear = currentDate.minusMonths(1).getMonthValue() + "/" + currentDate.minusMonths(1).getYear();

	// Lấy tháng và năm sau
	String nextMonthYear = currentDate.plusMonths(1).getMonthValue() + "/" + currentDate.plusMonths(1).getYear();

	// Đặt các giá trị vào request để sử dụng trong JSP
	request.setAttribute("currentMonthYear", currentMonthYear);
	request.setAttribute("lastMonthYear", lastMonthYear);
	request.setAttribute("nextMonthYear", nextMonthYear);
	%>

	<div class="content">
		<div class="tabs">
			<div class="tab active" onclick="showTab('last')">
				Tháng trước (<%=request.getAttribute("lastMonthYear")%>)
			</div>
			<div class="tab" onclick="showTab('current')">
				Hiện tại (<%=request.getAttribute("currentMonthYear")%>)
			</div>
			<div class="tab" onclick="showTab('future')">
				Tương lai (<%=request.getAttribute("nextMonthYear")%>)
			</div>
		</div>

		<div class="header-content">
			<div class="income">
				<div class="title">Thu Nhập</div>
				<span class="amount positive" id="incomeAmount">+698,626,843.72
					đ</span>
			</div>
			<div class="outcome">
				<div class="title">Chi Tiêu</div>
				<span class="amount negative" id="outcomeAmount">-562,687,198.62
					đ</span>
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

	<script>
    // Gán giá trị tháng và năm từ JSP vào JavaScript
    const lastMonthYear = "<%=request.getAttribute("lastMonthYear")%>";
    const currentMonthYear = "<%=request.getAttribute("currentMonthYear")%>";
    const nextMonthYear = "<%=request.getAttribute("nextMonthYear")%>";

    // Hàm gửi tháng và năm lên server
    function sendMonthToServer(selectedMonthYear) {
        const data = { monthYear: selectedMonthYear };

        fetch('ChartServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server Response:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // Hàm hiển thị dữ liệu cho các tab tương ứng
    function showTab(tab) {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(t => t.classList.remove('active'));

        let selectedMonthYear;
        if (tab === 'last') {
            tabs[0].classList.add('active');
            selectedMonthYear = lastMonthYear;
            updateChart("+500,000,000 đ", "-300,000,000 đ", [4000000, 800000], [100000, 50000]);
        } else if (tab === 'current') {
            tabs[1].classList.add('active');
            selectedMonthYear = currentMonthYear;
            updateChart("+698,626,843.72 đ", "-562,687,198.62 đ", [6000000, 1200000], [100000, 200000]);
        } else if (tab === 'future') {
            tabs[2].classList.add('active');
            selectedMonthYear = nextMonthYear;
            updateChart("+1,000,000,000 đ", "-400,000,000 đ", [8000000, 1600000], [200000, 100000]);
        }

        // Gửi tháng và năm đã chọn lên server
        sendMonthToServer(selectedMonthYear);
    }

    // Hàm cập nhật biểu đồ và số liệu
    function updateChart(income, outcome, revenueData, expenseData) {
        document.getElementById('incomeAmount').textContent = income;
        document.getElementById('outcomeAmount').textContent = outcome;

        revenueChart.data.datasets[0].data = revenueData;
        revenueChart.update();

        expenseChart.data.datasets[0].data = expenseData;
        expenseChart.update();
    }
</script>

</body>
</html>
