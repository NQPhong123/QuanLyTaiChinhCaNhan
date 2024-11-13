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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handle.dao.ExpenseDAO;
import com.handle.dao.IncomeDAO;
import com.handle.model.Expense;

import com.handle.model.Income;
import com.handle.model.RangeDate;
import com.handle.model.SearchData;
import com.handle.model.AmountRange;

@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			// Đọc nội dung yêu cầu (request body)
			StringBuilder sb = new StringBuilder();
			BufferedReader reader = request.getReader();
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
			String jsonString = sb.toString();

			
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.registerModule(new JavaTimeModule());
			// Ánh xạ JSON vào đối tượng SearchData
			SearchData searchData = objectMapper.readValue(jsonString, SearchData.class);

			// Lấy thông tin từ SearchData
			Integer categoryID = searchData.getCategoryID();
			RangeDate rangeDate = searchData.getRangeDate();
			AmountRange amountRange = searchData.getAmountRange();

			Integer userID = null;
			HttpSession session = request.getSession(false);
			if (session != null) {
				userID = (int) session.getAttribute("userID");
			}
			System.out.println(userID);

			// Chuẩn bị dữ liệu phản hồi
			Map<String, Object> responseData = new HashMap<>();
			responseData.put("status", "success");
			responseData.put("message", "Dữ liệu đã được nhận");
			responseData.put("categoryID", categoryID);
			responseData.put("rangeDate",rangeDate);
			responseData.put("amountRange", amountRange);

			// Lấy dữ liệu thu nhập và chi tiêu theo categoryID, date, amountRange
			IncomeDAO incomes = new IncomeDAO();
			ExpenseDAO expenses = new ExpenseDAO();
			List<Income> listIncome = incomes.searchTransactions(userID, categoryID, rangeDate, amountRange);
			List<Expense> listExpense = expenses.searchTransactions(userID, categoryID, rangeDate, amountRange);

			// Gộp tất cả vào một đối tượng phản hồi
			responseData.put("incomeList", listIncome);
			responseData.put("expenseList", listExpense);

			// Ghi dữ liệu phản hồi
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();
			out.print(objectMapper.writeValueAsString(responseData));
			out.flush();
		} catch (Exception e) {
			response.setContentType("application/json");
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			PrintWriter out = response.getWriter();
			out.write("{\"status\": \"error\", \"message\": \"" + e.getMessage() + "\"}");
			out.flush();
		}
	}
}
