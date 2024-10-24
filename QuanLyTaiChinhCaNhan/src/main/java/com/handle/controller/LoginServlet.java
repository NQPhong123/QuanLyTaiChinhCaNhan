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
        try {
            handleLogin(request, response);
        } catch (Exception e) {
            throw new ServletException(e);
        }
    }

    // Hàm chính xử lý đăng nhập
    private void handleLogin(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        // Gọi hàm tạo đối tượng User
        User user = createUser(email, password);

        // Gọi hàm kiểm tra và xử lý kết quả đăng nhập
        processLogin(user, request, response);
    }

    // Hàm tạo đối tượng User
    private User createUser(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassWord(password);
        return user;
    }

    // Hàm xử lý kết quả đăng nhập
    private void processLogin(User user, HttpServletRequest request, HttpServletResponse response) throws Exception {
        UserDao userDao = new UserDao();
        int userID = userDao.getUserID(user.getEmail(), user.getPassWord());
        if (userDao.checkUser(user)) {
            HttpSession session = request.getSession();
            session.setAttribute("email", user.getEmail());
            session.setAttribute("userID", userID);
            response.sendRedirect("index"); // Chuyển hướng đến trang index sau khi đăng nhập thành công
        } else {
            request.setAttribute("errorMessage", "Email hoặc mật khẩu không chính xác.");
            request.getRequestDispatcher("login").forward(request, response);
        }
    }
}
