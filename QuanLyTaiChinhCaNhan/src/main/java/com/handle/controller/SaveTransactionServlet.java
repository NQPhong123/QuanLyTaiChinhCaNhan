package com.handle.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handle.dao.ExpenseDAO;
import com.handle.dao.IncomeDAO;

// file này dùng để xử lý dữ liệu từ user và lưu Transaction
@WebServlet("/SaveTransaction")
public class SaveTransactionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			StringBuilder jsonSbTran = new StringBuilder(); // dùng để lưu stringJson từ request
			BufferedReader reader = request.getReader();
			String line;
			while ((line = reader.readLine()) != null) {
				jsonSbTran.append(line);
			}
			String jsonStringTran = jsonSbTran.toString();

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.registerModule(new JavaTimeModule());

			JsonNode jsonNode = objectMapper.readTree(jsonStringTran); // phân tích chuổi JSON thành một đối tượng
			String transactionType = jsonNode.get("transactionType").asText();
			int categoryID = jsonNode.get("categoryID").asInt();
			double amount = jsonNode.get("amount").asDouble();
			String dateString = jsonNode.get("date").asText();
			String description = jsonNode.get("decription").asText();
			LocalDate date = null; // Khởi tạo biến date
			if (dateString != null) { // Nếu dateString không null
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Định dạng chuỗi ngày thành
																							// kiểu LocalDate
				date = LocalDate.parse(dateString, formatter); // Chuyển dateString thành LocalDate
			}
			Integer userID = null;
			HttpSession session = request.getSession(false); // Lấy session hiện tại, nếu tồn tại
			if (session != null) {
				userID = (int) session.getAttribute("userID");
			}
			if (userID == null) {
				throw new IllegalStateException("User is not logged in.");
			}
			if (transactionType.equals("expense")) {
				ExpenseDAO expense = new ExpenseDAO();
				expense.InsertTransaction(userID, categoryID, date, amount, description);
			} else {
				IncomeDAO income = new IncomeDAO();
				income.InsertTransaction(userID, categoryID, date, amount, description);
			}
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();
			out.write("{\"status\": \"success\"}");
			out.flush();

		} catch (Exception e) {
			System.out.println("SaveTransactionServlet" + e.getMessage());
			response.setContentType("application/json");
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			PrintWriter out = response.getWriter();
			out.write("{\"status\": \"error\", \"message\": \"" + e.getMessage() + "\"}");
			out.flush();
		}
	}
}
