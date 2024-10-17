package com.handle.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.handle.dao.CategoryDAO;
import com.handle.model.Category;

@WebServlet("/CategoryServlet")
// lớp này dùng để trả về một Chuỗi JSON
public class CategoryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		CategoryDAO categoryDAO = new CategoryDAO();
		List<Category> categories = categoryDAO.getAllCategory();

		try {
			ObjectMapper mapper = new ObjectMapper();
			String json = mapper.writeValueAsString(categories); // chuyển đổ categories(LIST) thành chuỗi JSON
			// định nghĩa dữ liệu servlet trả về
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			// trả về json
			response.getWriter().write(json);
		} catch (Exception e) {

			response.getWriter().write(e.getMessage());
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
