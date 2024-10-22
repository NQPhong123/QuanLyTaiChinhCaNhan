package com.handle.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Pattern;
import jakarta.servlet.http.HttpSession;
import com.handle.dao.UserDao;
import com.handle.model.User;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            handleRegister(request, response);
        } catch (Exception e) {
            throw new ServletException(e); // Chuyển lỗi lên ServletException
        }
    }

    private void handleRegister(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirm_password");

        // Regex email and password
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
        String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$"; // At least 8 chars, 1 digit, 1 lower, 1
                                                                           // upper case

        boolean hasError = false;

        // Validate email
        if (!Pattern.matches(emailRegex, email)) {
            request.setAttribute("emailError", "Nhập sai email");
            hasError = true;
        }

        // Validate password
        if (!Pattern.matches(passwordRegex, password)) {
            request.setAttribute("passwordError", "Phải có 8 kí tự, có chữ hoa, thường và số");
            hasError = true;
        }

        // Confirm password match
        if (!password.equals(confirmPassword)) {
            request.setAttribute("confirmPasswordError", "Mật khẩu không khớp");
            hasError = true;
        }

        // If there is an error, redirect back to register page
        if (hasError) {
            request.getRequestDispatcher("register").forward(request, response);
            return;
        }

        // Save user if no errors
        User user = new User();
        user.setEmail(email);
        user.setPassWord(password);

        UserDao userDao = new UserDao();
        if (userDao.saveUser(user)) {
            HttpSession session = request.getSession();
            session.setAttribute("successMessage", "Đăng kí thành công! Bạn có thể đăng nhập.");
            response.sendRedirect("login");
        } else {
            request.setAttribute("errorMessage", "Email đã tồn tại, vui lòng thử lại");
            request.getRequestDispatcher("register").forward(request, response);
        }
    }
}
