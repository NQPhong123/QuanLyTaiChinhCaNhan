<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="jakarta.servlet.http.HttpSession" %> <!-- Import HttpSession -->
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Money Lover - Login</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/login.css">
    <link rel="icon" href="${pageContext.request.contextPath}/image/icon_page.png" type="image/png">
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <img src="${pageContext.request.contextPath}/image/icon_page.png" alt="Money Lover Logo">
            <h1>Money Lover</h1>
        </div>
        <div class="login-box">
            <h2>Log In</h2>
           <%
    // Lấy thông báo từ session và hiển thị
    if (session != null) {
        String successMessage = (String) session.getAttribute("successMessage");
        if (successMessage != null) {
            out.print("<div class='success' style='color:green'>" + successMessage + "</div>");
            session.removeAttribute("successMessage"); // Xóa thông báo sau khi hiển thị
        }
    }
%>
            <div class="social-login">
                <button class="google">Connect with Google</button>
                <button class="facebook">Connect with Facebook</button>
                <button class="apple">Sign in with Apple</button>
            </div>
            <div class="divider">or</div>
            <form class="login-form" action="LoginServlet" method="post">
                <!-- Email Input -->
                <input type="email" name="email" placeholder="Email" value="<%= request.getParameter("email") != null ? request.getParameter("email") : "" %>" required>
                <%
                    String emailError = (String) request.getAttribute("emailError");
                    if (emailError != null) {
                %>
                    <div class="error" style="color:red"><%= emailError %></div>
                <%
                    }
                %>

                <!-- Password Input -->
                <input type="password" name="password" placeholder="Password" required>
                <%
                    String passwordError = (String) request.getAttribute("passwordError");
                    if (passwordError != null) {
                %>
                    <div class="error" style="color:red"><%= passwordError %></div>
                <%
                    }
                %>

                <a href="#" class="forgot-password">Forgot Password?</a>
                <button type="submit" class="login-button">LOGIN</button>
            </form>
            <%
    // Hiển thị thông báo lỗi khi thông tin đăng nhập không chính xác
    String errorMessage = (String) request.getAttribute("errorMessage");
    if (errorMessage != null) {
%>
    <div class="error" style="color:red"><%= errorMessage %></div>
<%
    }
%>
            <p>Don't have an account? <a href="${pageContext.request.contextPath}/register.jsp">Register</a></p> <!-- Sửa đường dẫn -->
        </div>
    </div>
</body>
</html>
