<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
    <meta name="description" content="Bảng điều khiển của người dùng Money Lover với biểu đồ tài chính động và dữ liệu thực tế.">
    <link rel="icon" href="image/icon_page.png" type="image/png">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="loading-screen">
        <div class="spinner"></div>
    </div>

    <%@ include file="/WEB-INF/includes/header.jsp" %>
    <div class="content">
        <div class="transaction-content">
            <div class="header-contain">
                <div class="tab active" onclick="showTab('last')">Tháng trước</div>
                <div class="tab" onclick="showTab('current')">Hiện tại</div>
                <div class="tab" onclick="showTab('future')">Tương lai</div>
            </div>

            <div class="main-content" id="content">
                <div class="transaction-content">
                    <div class="inflow-outflow">
                        <div class="inflow">
                            <div>Tiền Vào</div>
                            <span class="amount positive">+698,626,843.72 đ</span>
                        </div>
                        <div class="outflow">
                            <div>Tiền Ra</div>
                            <span class="amount negative">-562,687,198.62 đ</span>
                        </div>
                        <div class="balance">+135,939,645.10 đ</div>
                    </div>

                    <button id="addTransactionBtn">THÊM GIAO DỊCH(thay thế bằng nút Lưu)</button>
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
        function showTab(tab) {
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(t => {
                t.classList.remove('active');
            });

            if (tab === 'last') {
                tabs[0].classList.add('active');
                updateInflowOutflow("+698,626,843.72 đ", "-562,687,198.62 đ", "+135,939,645.10 đ");
            } else if (tab === 'current') {
                tabs[1].classList.add('active');
                updateInflowOutflow("+800,000,000.00 đ", "-500,000,000.00 đ", "+300,000,000.00 đ");
            } else {
                tabs[2].classList.add('active');
                updateInflowOutflow("+1,000,000,000.00 đ", "-400,000,000.00 đ", "+600,000,000.00 đ");
            }
        }

        function updateInflowOutflow(inflow, outflow, balance) {
            document.querySelector('.inflow .amount').textContent = inflow;
            document.querySelector('.outflow .amount').textContent = outflow;
            document.querySelector('.balance').textContent = balance;
        }
    </script>
</body>
</html>
