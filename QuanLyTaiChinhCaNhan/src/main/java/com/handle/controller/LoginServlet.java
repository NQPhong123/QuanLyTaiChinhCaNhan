package com.handle.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

import com.handle.dao.UserDao;
import com.handle.model.User;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        User user = new User();
        user.setEmail(email);
        user.setPassWord(password);

        UserDao userDao = new UserDao();
        if (userDao.checkUser(user)) {
            HttpSession session = request.getSession();
            session.setAttribute("email", email);
            session.setAttribute("successMessage", "Đăng nhập thành công!");
            response.sendRedirect("index"); // Chuyển hướng đến trang index sau khi đăng nhập thành công
        } else {
            request.setAttribute("errorMessage", "Email hoặc mật khẩu không chính xác.");
            request.getRequestDispatcher("login").forward(request, response);
        }
    }
}
