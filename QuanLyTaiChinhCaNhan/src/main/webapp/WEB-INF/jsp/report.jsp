<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String emailUser = (String) session.getAttribute("email");

if (emailUser == null) {
    response.sendRedirect("login");
    return;
}
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Báo cáo tài chính</title>
    <style>
        /* Styles */
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
        <div class="tabs">
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

        <div class="header-content">
            <div class="income">
                <div class="title">Thu Nhập</div>
                <span class="amount positive" id="incomeAmount">+0 đ</span>
            </div>
            <div class="outcome">
                <div class="title">Chi Tiêu</div>
                <span class="amount negative" id="outcomeAmount">-0 đ</span>
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
    <script type="module" src="assets/js/fetchChartData.js"></script>


     
    

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
<!-- ... -->
