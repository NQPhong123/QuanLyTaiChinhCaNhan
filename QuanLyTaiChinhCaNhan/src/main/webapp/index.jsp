<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<%
String emailUser = (String) session.getAttribute("email");
if(emailUser == null){
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
	content="Báº£ng Äiá»u khiá»n cá»§a ngÆ°á»i dÃ¹ng Money Lover vá»i biá»u Äá» tÃ i chÃ­nh Äá»ng vÃ  dá»¯ liá»u thá»±c táº¿.">
<link rel="icon" href="image/icon_page.png" type="image/png">
<title>Money Lover - Dashboard cá»§a NgÆ°á»i dÃ¹ng</title>

<link rel="stylesheet" href="assets/css/style.css">

</head>
<body>
	<%@ include file="/WEB-INF/includes/header.jsp"%>
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

            <div class="transactions">
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

                <div class="transaction-day">
                    <div class="transaction-day-head">
                        <div class="date">
                            04 <span class="day">Sunday</span> <span class="month">June 2023</span>
                        </div>
                        <span class="amount total negative">-100.00 đ</span>
                    </div>
                    <div class="transaction">
                        <div class="icon">
                            <img src="image/icon_gas.png" alt="Gas Bill" />
                        </div>
                        <div class="details">
                            <div class="category">Gas Bill</div>
                            <div class="amount negative">-50.00 đ</div>
                        </div>
                    </div>
                    <div class="transaction">
                        <div class="icon">
                            <img src="image/icon_persional.png" alt="Personal Items" />
                        </div>
                        <div class="details">
                            <div class="category">Personal Items <span class="note">cut hair</span></div>
                            <div class="amount negative">-50.00 đ</div>
                        </div>
                    </div>
                </div>
            </div>
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



	<script type="text/javascript" src="assets/js/index.js"></script>
	<script type="text/javascript" src="assets/js/api/CategoryApi.js"></script>
</body>


</html>
