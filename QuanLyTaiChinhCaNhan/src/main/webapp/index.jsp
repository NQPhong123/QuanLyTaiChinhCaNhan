<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String emailUser = (String) session.getAttribute("email");
if (emailUser == null) {
	response.sendRedirect("login");
	return;
}
%>



<%@ page import="java.sql.*"%>
<%
// Database connection parameters
String url = "jdbc:mysql://localhost:3306/quanlychitieu";
String user = "root";
String password = "";

Connection conn = null;
Statement stmt = null;
ResultSet rs = null;

try {
	// Load JDBC driver (Ensure MySQL Connector/J is added to your project)
	Class.forName("com.mysql.cj.jdbc.Driver");
	conn = DriverManager.getConnection(url, user, password);

	// SQL Query to fetch both expenses and income
	String query = "SELECT e.Date AS TransactionDate, c.CategoryName, e.Amount * -1 AS Amount, c.Type, c.URL_Image "
	+ "FROM expense e " + "JOIN category c ON e.CategoryID = c.CategoryID " + "UNION ALL "
	+ "SELECT i.Date AS TransactionDate, c.CategoryName, i.Amount, c.Type, c.URL_Image " + "FROM income i "
	+ "JOIN category c ON i.CategoryID = c.CategoryID " + "ORDER BY TransactionDate;";

	stmt = conn.createStatement();
	rs = stmt.executeQuery(query);
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
						<h1>Danh sách giao dịch</h1>
						<div id="transaction-container">
							<!-- Dữ liệu giao dịch sẽ được hiển thị tại đây -->
						</div>

						<script type="module" src="assets/js/api/SearchApi.js"></script>
					</body>


					<tbody>
						<%
						String previousDate = null; // Biến để lưu trữ ngày giao dịch trước đó
						double dailyTotal = 0; // Biến để lưu trữ tổng tiền của giao dịch trong ngày

						while (rs.next()) {
							String date = rs.getString("TransactionDate");
							String categoryName = rs.getString("CategoryName");
							double amount = rs.getDouble("Amount");
							String imageUrl = "image/" + rs.getString("URL_Image");

							// Kiểm tra nếu ngày giao dịch đã thay đổi
							if (!date.equals(previousDate)) {
								// Nếu ngày giao dịch khác ngày trước đó, hiển thị tiêu đề ngày giao dịch
								if (previousDate != null) { // Nếu không phải là lần đầu tiên, hiển thị tổng tiền của ngày trước đó
						%>
						<div class="transaction-day-total">
							<span
								class="amount total <%=dailyTotal < 0 ? "negative" : "positive"%>">
								Tổng: <%=String.format("%,.2f đ", dailyTotal)%>
							</span>
						</div>
						<%
						}
						// Hiển thị tiêu đề ngày giao dịch mới
						%>
						<div class="transaction-day">
							<div class="transaction-day-head">
								<div class="date">
									<%=date%>
									<span><%=new java.text.SimpleDateFormat("EEEE").format(rs.getDate("TransactionDate"))%></span>
								</div>
								<span
									class="amount total <%=amount < 0 ? "negative" : "positive"%>">
									<%=String.format("%,.2f đ", amount)%>
								</span>
							</div>
							<%
							// Đặt lại tổng tiền hàng ngày
							dailyTotal = amount; // Khởi tạo tổng tiền cho ngày mới
							} else {
							// Nếu ngày giao dịch không thay đổi, cộng dồn vào tổng tiền
							dailyTotal += amount;
							}

							// Hiển thị giao dịch
							%>
							<div class="transaction">
								<div class="icon">
									<img src="<%=imageUrl%>" />
								</div>
								<div class="details">
									<div class="category"><%=categoryName%></div>
									<div class="amount <%=amount < 0 ? "negative" : "positive"%>">
										<%=String.format("%,.2f đ", amount)%>
									</div>
								</div>
							</div>
							<%
							// Cập nhật ngày giao dịch trước đó
							previousDate = date;
							} // Kết thúc vòng lặp while

							// Hiển thị tổng tiền cho ngày cuối cùng nếu có giao dịch
							if (previousDate != null) {
							%>
							<div class="transaction-day-total">
								<span
									class="amount total <%=dailyTotal < 0 ? "negative" : "positive"%>">
									Tổng: <%=String.format("%,.2f đ", dailyTotal)%>
								</span>
							</div>
							<%
							}
							%>
						</div>
						<!-- Kết thúc div.transaction-day -->
					</tbody>






					
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

<%
} catch (Exception e) {
e.printStackTrace();
} finally {
// Close resources
if (rs != null)
	rs.close();
if (stmt != null)
	stmt.close();
if (conn != null)
	conn.close();
}
%>

</html>
