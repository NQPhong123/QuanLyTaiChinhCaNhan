package com.handle.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.handle.dao.UserDao;
import com.handle.model.User;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String email = request.getParameter("email"); 
		String password = request.getParameter("password");
		
		User user = new User();
		user.setEmail(email);
		user.setPassWord(password);
		
		UserDao userDao = new UserDao();
		if(userDao.saveUser(user)) {
			response.sendRedirect("login");
		}else {
			request.setAttribute("errorMessage", "Registration failed. Please try again.");
			request.getRequestDispatcher("register").forward(request, response);
		}
	}

}
