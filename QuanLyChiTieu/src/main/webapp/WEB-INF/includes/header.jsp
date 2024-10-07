<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
	rel="stylesheet" />
<style type="text/css">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif; /* Sửa: không cần lặp lại Arial */
}

.sidebar {
    width: 15%;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar .menu-item {
    padding: 15px 20px;
    display: flex;
    align-items: center;
    color: #666;
    text-decoration: none;
    font-size: 14px;
}

.sidebar .menu-item:hover {
    background-color: #f0f0f0;
}

.sidebar .menu-item i {
    margin-right: 10px;
}

.sidebar .menu-item.active {
    color: #4caf50;
}

.sidebar .menu-item.active i {
    color: #4caf50;
}

.sidebar .menu-item:last-child {
    margin-top: auto;
}



.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 85%;
    margin-left: 15%;
}

.header .user-info {
    display: flex;
    align-items: center;
}

.header .user-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.header .user-info span {
    font-size: 16px;
    font-weight: bold;
}

.header .actions {
    display: flex;
    align-items: center;
}

.header .actions i {
    font-size: 20px;
    margin-right: 20px;
    cursor: pointer;
}

.header .actions .btn {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
</head>
<body>
 <nav>
     <div class="sidebar">
        <a class="menu-item active" href="index.jsp"> <i class="fas fa-file-alt"></i> Sổ giao dịch</a> 
        <a class="menu-item" href="report"> <i class="fas fa-chart-bar"></i> Báo cáo</a> 
        <a class="menu-item" href="#"> <i class="fas fa-wallet"></i> Ngân sách</a> 
        <a class="menu-item" href="#"> <i class="fas fa-question-circle"></i> Trợ giúp</a>
    </div>
    <div class="header">
        <div class="user-info">
            <img alt="User Avatar" src="https://storage.googleapis.com/a1aa/image/rsKzFeIQXA0aGiDTVe4khscIXuI1O9vmq1dyHeO7Yx7IC5FnA.jpg" /> 
            <span> Tiền mặt - 19,645,000.00 </span>
        </div>
        <div class="actions">
            <i class="fas fa-cog"></i> 
            <i class="fas fa-search"></i>
            <button class="btn" onclick="showTransactionForm()">THÊM GIAO DỊCH</button>
            <script src="assets/js/function.js"></script>
        </div>
    </div></nav>
</body>
</html>
