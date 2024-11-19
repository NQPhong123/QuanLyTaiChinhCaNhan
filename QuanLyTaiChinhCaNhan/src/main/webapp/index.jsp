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
				<div class="tab active" onclick="showTab('last')">
					Tháng trước (<%=request.getAttribute("lastMonth")%>)
				</div>
				<div class="tab" onclick="showTab('current')">
					Hiện tại (<%=request.getAttribute("currentMonth")%>)
				</div>
				<div class="tab" onclick="showTab('future')">
					Tương lai (<%=request.getAttribute("nextMonth")%>)
				</div>
			</div>

			<div class="main-content" id="content">
				<div class="transaction-content">
					<div class="inflow-outflow">
						<div class="income">
							<div class="title">Tiền Vào</div>
							<span class="amount positive" id="incomeAmount">+698,626,843.72
								đ</span>
						</div>
						<div class="outcome">
							<div class="title">Tiền Ra</div>
							<span class="amount negative" id="outcomeAmount">-562,687,198.62
								đ</span>
						</div>
						<div class="balance">+135,939,645.10 đ</div>
					</div>
					<button id="addTransactionBtn">THÊM GIAO DỊCH(thay thế
						bằng nút Lưu)</button>

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






					<div class="transactions" id="transactionsContainer">
						<!-- Nội dung giao dịch sẽ được thêm vào đây -->

					</div>

					<script>
                        document.getElementById('addTransactionBtn').addEventListener('click', function() {
                            // Tạo giao dịch mới
                            const transactionHtml = `
                                <div class="transaction-day">
                                    <div class="transaction-day-head">
                                        <div class="date">
                                            05 <span class="day">Monday</span> <span class="month">June 2023</span>
                                        </div>
                                        <span class="amount total negative">-25.00 đ</span>
                                    </div>
                                    <div class="transaction">
                                        <div class="icon">
                                            <img src="image/ic_category_foodndrink.png" alt="Food & Beverage" />
                                        </div>
                                        <div class="details">
                                            <div class="category">Food & Beverage</div>
                                            <div class="amount negative">-25.00 đ</div>
                                        </div>
                                    </div>
                                    <div class="transaction">
                                        <div class="icon">
                                            <img src="image/ic_category_salary.png" alt="Salary" />
                                        </div>
                                        <div class="details">
                                            <div class="category">Salary <span class="note">from mother</span></div>
                                            <div class="amount positive">+750.00 đ</div>
                                        </div>
                                    </div>
                                </div>
                            `;

                            // Thêm giao dịch vào container
                            document.getElementById('transactionsContainer').insertAdjacentHTML('beforeend', transactionHtml);
                         
                            
                            
                            
                            // chỗ bê hết code index.js
                            const transactions = document.querySelectorAll('.transaction');

                            transactions.forEach(transaction => {
                                transaction.addEventListener('click', () => {
                                    const targetDiv = document.querySelector('.transaction-content');
                                    const existingDetail = document.querySelector('.detail-transaction');
                                    
                                    // Remove existing detail-transaction if it exists
                                    if (existingDetail) {
                                        existingDetail.remove();
                                    }

                                    // Update margin for targetDiv (nếu cần)
                                    targetDiv.style.margin = '0 0 0 250px';
                                    
                                    // Define the new HTML for the detail-transaction
                                    const newHTML = `
                                    <div class="detail-transaction"
                                        style="width: 500px; height: 300px; margin: 50px 0 0 0; border: 1px solid #ccc; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                        <div style="display: flex; align-items: center; justify-content: space-between;">
                                            <h2 style="font-size: 18px; margin: 0;">Số giao dịch</h2>
                                            <div>
                                                <a href="#" id="btn-del" style="color: red; text-decoration: none; margin-right: 10px;">XÓA</a>
                                                <a href="#" style="color: green; text-decoration: none;">SỬA</a>
                                            </div>
                                        </div>
                                        <div style="display: flex; align-items: center; margin: 15px 0;">
                                            <img src="https://i.imgur.com/fHXvUeO.png" alt="icon" style="width: 30px; height: 30px; margin-right: 10px;">
                                            <div>
                                                <h3 style="font-size: 16px; margin: 0;">Salary</h3>
                                                <p style="color: gray; font-size: 14px; margin: 0;">Chi tiêu gia đình</p>
                                                <p style="color: gray; font-size: 12px; margin: 0;">Thứ hai, 10/06/2019</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p style="color: gray; font-size: 14px; margin: 0;">Tiền lương của vợ</p>
                                            <h1 style="color: #00b2ff; font-size: 28px; margin: 5px 0;">+11,000,000.00</h1>
                                        </div>
                                    </div>`;

                                    // Insert the new detail-transaction after the targetDiv
                                    targetDiv.insertAdjacentHTML('afterend', newHTML);
                                    
                                    // Add event listener to the "XÓA" button to remove the detail-transaction
                                    const btnDel = document.getElementById('btn-del');
                                    btnDel.addEventListener('click', () => {
                                        const detailToRemove = document.querySelector('.detail-transaction');
                                        if (detailToRemove) {
                                            detailToRemove.remove();
                                        }
                                    });
                                });
                            });
                        
                            window.addEventListener("load", () => {
                                document.querySelector(".loading-screen").style.display = "none";
                                document.getElementById("content").style.display = "block";
                              });

                        });
                    </script>
					<script type="text/javascript" src="assets/js/index.js"></script>
				</div>
			</div>
		</div>
	</div>

	<script>
  
    // Gán giá trị tháng từ JSP vào JavaScript
    const lastMonth = <%=request.getAttribute("lastMonth")%>;
    const currentMonth = <%=request.getAttribute("currentMonth")%>;
    const nextMonth = <%=request.getAttribute("nextMonth")%>;

    // Hàm gửi tháng lên server
    function sendMonthToServer(selectedMonth) {
        const data = { month: selectedMonth };

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

        let selectedMonth;
        if (tab === 'last') {
            tabs[0].classList.add('active');
            selectedMonth = lastMonth;
            updateChart("+500,000,000 đ", "-300,000,000 đ", [4000000, 800000], [100000, 50000]);
        } else if (tab === 'current') {
            tabs[1].classList.add('active');
            selectedMonth = currentMonth;
            updateChart("+698,626,843.72 đ", "-562,687,198.62 đ", [6000000, 1200000], [100000, 200000]);
        } else if (tab === 'future') {
            tabs[2].classList.add('active');
            selectedMonth = nextMonth;
            updateChart("+1,000,000,000 đ", "-400,000,000 đ", [8000000, 1600000], [200000, 100000]);
        }

        // Gửi tháng đã chọn lên server
        sendMonthToServer(selectedMonth);
    }
 // Hàm cập nhật biểu đồ và số liệu
    function updateChart(income, outcome, revenueData, expenseData) {
        document.getElementById('incomeAmount').textContent = income;
        document.getElementById('outcomeAmount').textContent = outcome;

        
    }
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
