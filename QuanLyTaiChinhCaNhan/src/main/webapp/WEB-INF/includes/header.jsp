<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
<link rel="stylesheet" href="assets/css/header.css">

<link href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.min.css" rel="stylesheet"> <!-- thư viện tạo thanh range tìm kiếm -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.min.js"></script><!-- thư viện tạo thanh range tìm kiếm -->

<script type="module" src="assets/js/api/CategoryApi.js"></script>  
<script type="module" src="assets/js/api/SearchApi.js"></script>
<script type="module" src="assets/js/button.js "></script>
<script type="module" src="assets/js/SearchButton.js "></script>
<script type="module" src="assets/js/AddTransactionButton.js "></script>
</head>
<body>
    <%
        String userEmail = (session != null) ? (String) session.getAttribute("email") : null;
    %>
    <nav>
        <div class="sidebar">
            <a class="menu-item active" href="index.jsp"> <i
                class="fas fa-file-alt"></i> Sổ giao dịch
            </a> <a class="menu-item" href="report"> <i class="fas fa-chart-bar"></i>
                Báo cáo
            </a> <a class="menu-item" href="LogoutServlet"> <i
                class="fa-solid fa-right-from-bracket"></i> Đăng xuất
            </a>
        </div>
        <div class="header">
            <div class="user-info">
                <img alt="User Avatar"
                    src="https://storage.googleapis.com/a1aa/image/rsKzFeIQXA0aGiDTVe4khscIXuI1O9vmq1dyHeO7Yx7IC5FnA.jpg" />
                <span>
                    <% if (userEmail != null) { %>
                        <%= userEmail %>
                    <% } else { %>
                        Khách
                    <% } %>
                </span>
            </div>
            <div class="actions">
                <button id="btn-search" onclick="searchButton.openButton() ">
                    <i class="fas fa-search"></i>
                </button>

                <button id="btn-addTransaction"
                    onclick="addTransaction.openButton()">THÊM GIAO DỊCH</button>
            </div>
        </div>
    </nav>

</body>
</html>
