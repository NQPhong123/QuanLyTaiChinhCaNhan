<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>
<%
String emailUser = (String) session.getAttribute("email");
if (emailUser == null) {
	response.sendRedirect("login");
	return;
}
%>

<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description"
	content="Bảng điều khiển của người dùng Money Lover với biểu đồ tài chính động và dữ liệu thực tế.">
<link rel="icon" href="image/icon_page.png" type="image/png">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
	<div class="loading-screen">
		<div class="spinner"></div>
	</div>

	<%@ include file="/WEB-INF/includes/header.jsp"%>
	<script type="module" src="assets/js/api/SearchApi.js"></script>
	<script type="module" src="assets/js/SearchButton.js"></script>
	<%
	java.time.LocalDate currentDate = java.time.LocalDate.now();

	// Lấy tháng hiện tại
	int currentMonth = currentDate.getMonthValue();

	// Lấy tháng trước
	int lastMonth = currentDate.minusMonths(1).getMonthValue();

	// Lấy tháng sau
	int nextMonth = currentDate.plusMonths(1).getMonthValue();

	// Đặt các giá trị vào request để sử dụng trong JSP
	request.setAttribute("currentMonth", currentMonth);
	request.setAttribute("lastMonth", lastMonth);
	request.setAttribute("nextMonth", nextMonth);
	%>


	<div class="content">
		<div class="transaction-content">
			<div class="header-contain">
				<div class="tab active" onclick="showTabAndFetchData('last')">
					Tháng trước (<%=request.getAttribute("lastMonth")%>)
				</div>
				<div class="tab" onclick="showTabAndFetchData('current')">
					Hiện tại (<%=request.getAttribute("currentMonth")%>)
				</div>
				<div class="tab" onclick="showTabAndFetchData('future')">
					Tương lai (<%=request.getAttribute("nextMonth")%>)
				</div>
			</div>

			<div class="main-content" id="content">
				<div class="transaction-content">
					<div class="inflow-outflow">
						<div class="income">
							<div class="title">Tiền Vào</div>
							<span class="amount positive" id="incomeAmount">+0 đ</span>
						</div>
						<div class="outcome">
							<div class="title">Tiền Ra</div>
							<span class="amount negative" id="outcomeAmount">-0 đ</span>
						</div>
						<div class="balance" id="totalAmountDisplay">0 đ</div>

					</div>

					<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
					<script src="assets/js/chart.js"></script>
					<script type="module" src="assets/js/fetchChartData.js"></script>
					<body>


						<div id="transaction-container" style="display: none;">
							<!-- Dữ liệu giao dịch từ JavaScript sẽ được hiển thị ở đây -->
						</div>

						<div id="jsp-transaction-container">
							<div id="allDetails"></div>


							<script type="module" src="assets/js/fetchChartData.js"></script>
							<script type="module" src="assets/js/index.js"></script>
							<script type="module" src="assets/js/api/SearchApi.js"></script>
					</body>

					<script type="text/javascript" src="assets/js/index.js"></script>
				</div>
			</div>
		</div>
	</div>

	<script>
    const lastMonth = <%=request.getAttribute("lastMonth")%>;
    const currentMonth = <%=request.getAttribute("currentMonth")%>;
    const nextMonth = <%=request.getAttribute("nextMonth")%>;

    // Hàm lấy phạm vi ngày với định dạng YYYY-MM-DD - YYYY-MM-DD
    function getRangeDate(year, month) {
        const startDate = new Date(year, month - 1, 1); // ngày đầu tiên của tháng
        const endDate = new Date(year, month, 0);       // ngày cuối cùng của tháng

        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        return `${formattedStartDate} - ${formattedEndDate}`;
    }

    function sendMonthToServer(selectedMonth) {
        const year = new Date().getFullYear();
        const rangeDate = getRangeDate(year, selectedMonth); // Chuỗi định dạng YYYY-MM-DD - YYYY-MM-DD

        const data = {
            month: selectedMonth,
            rangeDate: rangeDate  // Sử dụng định dạng chuẩn YYYY-MM-DD - YYYY-MM-DD
        };

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

    function showTabAndFetchData(tab) {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(t => t.classList.remove('active'));

        let selectedMonth;
        if (tab === 'last') {
            tabs[0].classList.add('active');
            selectedMonth = lastMonth;
        } else if (tab === 'current') {
            tabs[1].classList.add('active');
            selectedMonth = currentMonth;
        } else {
            tabs[2].classList.add('active');
            selectedMonth = nextMonth;
        }

        sendMonthToServer(selectedMonth);
        fetchChartData(selectedMonth); // Gọi hàm lấy dữ liệu và cập nhật biểu đồ
    }

    window.addEventListener('load', () => {
    	showTabAndFetchData('current');
    });


    </script>
</body>



</html>
