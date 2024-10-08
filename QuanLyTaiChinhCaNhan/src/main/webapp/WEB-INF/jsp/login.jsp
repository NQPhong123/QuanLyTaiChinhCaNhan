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
			String errorMessage = (String) request.getAttribute("errorMessage");
			if(errorMessage != null && !errorMessage.isEmpty()){
				%> <div class="error" style="color:red"><%= errorMessage %></div> <% 
			}
			%>
            <div class="social-login">
                <button class="google">Connect with Google</button>
                <button class="facebook">Connect with Facebook</button>
                <button class="apple">Sign in with Apple</button>
            </div>
            <div class="divider">or</div>
            <form class="login-form" action="LoginServlet" method="post">
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <a href="#" class="forgot-password">Forgot Password?</a>
                <button type="submit" class="login-button">LOGIN</button>
            </form>
            <p>Don't have an account? <a href="register">Register</a></p>
        </div>
    </div>
</body>
</html>