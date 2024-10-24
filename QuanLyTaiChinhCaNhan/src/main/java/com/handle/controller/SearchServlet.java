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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handle.dao.ExpenseDAO;
import com.handle.dao.IncomeDAO;
import com.handle.model.Expense;
import com.handle.model.Income;


/**
 * Servlet implementation class SearchServlet
 */
@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			// Read the request body
			StringBuilder sb = new StringBuilder();
			BufferedReader reader = request.getReader();
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
			String jsonString = sb.toString();

			// Parse JSON input
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.registerModule(new JavaTimeModule()); // hiểu được serialize của LocalDate

			JsonNode jsonNode = objectMapper.readTree(jsonString);
			Integer categoryID = jsonNode.get("categoryID").isNull() ? null : jsonNode.get("categoryID").asInt();
			String dateString = jsonNode.get("date").isNull() ? null : jsonNode.get("date").asText();
			Double amount = jsonNode.get("amount").isNull() ? null : jsonNode.get("amount").asDouble();
			LocalDate date = null;
			if (dateString != null) {
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // chuyển dateString sang
																							// LocalDate
				date = LocalDate.parse(dateString, formatter);
			}
			Integer userID = null;
			HttpSession session = request.getSession(false);
			if (session != null) {
				userID = (int) session.getAttribute("userID");
			}
			System.out.println(userID);
			// Prepare response data
			Map<String, Object> responseData = new HashMap<>();
			responseData.put("status", "success");
			responseData.put("message", "Dữ liệu đã được nhận");
			responseData.put("categoryID", categoryID);
			responseData.put("date", dateString);
			responseData.put("amount", amount);

			// Lấy dữ liệu income và expense theo categoryID, date, amount
			IncomeDAO incomes = new IncomeDAO();
			ExpenseDAO expenses = new ExpenseDAO();
			List<Income> listIncome = incomes.searchTransactions(userID, categoryID, date, amount);
			List<Expense> listExpense = expenses.searchTransactions(userID, categoryID, date, amount);

			// Gộp tất cả vào một đối tượng phản hồi
			responseData.put("incomeList", listIncome);
			responseData.put("expenseList", listExpense);

			// Ghi dữ liệu phản hồi
			PrintWriter out = response.getWriter();
			out.print(objectMapper.writeValueAsString(responseData)); // Gửi tất cả trong một JSON
			out.flush();
		} catch (Exception e) {
			response.setContentType("text");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.print(e.getMessage());
			out.flush();
		}
	}
}
