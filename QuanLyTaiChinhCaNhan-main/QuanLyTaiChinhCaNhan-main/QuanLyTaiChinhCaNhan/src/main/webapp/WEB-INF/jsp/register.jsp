<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Money Lover - Register</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/login.css">
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <img src="${pageContext.request.contextPath}/image/icon_page.png" alt="Money Lover Logo">
            <h1>Money Lover</h1>
        </div>
        <div class="login-box">
            <h2>REGISTER</h2>
            <%
            String errorMessage = (String) request.getAttribute("errorMessage");
            String emailError = (String) request.getAttribute("emailError");
            String passwordError = (String) request.getAttribute("passwordError");
            String confirmPasswordError = (String) request.getAttribute("confirmPasswordError");
            if (errorMessage != null && !errorMessage.isEmpty()) {
                %> <div class="error" style="color:red"><%= errorMessage %></div> <%
            }
            %>
            <form class="login-form" action="RegisterServlet" method="post">
                <input type="email" name="email" placeholder="Email" required>
                <div class="error" style="color:red"><%= emailError != null ? emailError : "" %></div>

                <input type="password" name="password" placeholder="Password" required>
                <div class="error" style="color:red"><%= passwordError != null ? passwordError : "" %></div>

                <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                <div class="error" style="color:red"><%= confirmPasswordError != null ? confirmPasswordError : "" %></div>

                <button type="submit" class="login-button">REGISTER</button>
            </form>
            <p>
                You have an account? <a href="login">LOGIN</a>
            </p>
        </div>
    </div>
</body>
</html>
