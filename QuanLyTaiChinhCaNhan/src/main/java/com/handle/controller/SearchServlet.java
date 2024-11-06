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
@WebServlet("/SearchServlet") // Định nghĩa đường dẫn URL cho servlet này
public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L; // ID phiên bản cho quá trình tuần tự hóa (serialization)

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			// Đọc nội dung yêu cầu (request body)
			StringBuilder sb = new StringBuilder(); // Tạo đối tượng StringBuilder để lưu trữ dữ liệu
			BufferedReader reader = request.getReader(); // Lấy BufferedReader từ request để đọc dữ liệu
			String line;
			while ((line = reader.readLine()) != null) { 
				sb.append(line); 
			}
			String jsonString = sb.toString(); // Chuyển dữ liệu thành chuỗi JSON

			// Phân tích chuỗi JSON đầu vào
			ObjectMapper objectMapper = new ObjectMapper(); // Tạo đối tượng ObjectMapper để xử lý JSON
			objectMapper.registerModule(new JavaTimeModule()); // Đăng ký module JavaTime để hỗ trợ LocalDate

			JsonNode jsonNode = objectMapper.readTree(jsonString); // Phân tích chuỗi JSON thành cây đối tượng
			Integer categoryID = jsonNode.get("categoryID").isNull() ? null : jsonNode.get("categoryID").asInt(); // Lấy categoryID từ JSON, kiểm tra nếu nó null
			String dateString = jsonNode.get("date").isNull() ? null : jsonNode.get("date").asText(); // Lấy chuỗi ngày (date) từ JSON
			Double amount = jsonNode.get("amount").isNull() ? null : jsonNode.get("amount").asDouble(); // Lấy amount từ JSON
			LocalDate date = null; // Khởi tạo biến date
			if (dateString != null) { // Nếu dateString không null
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Định dạng chuỗi ngày thành kiểu LocalDate
				date = LocalDate.parse(dateString, formatter); // Chuyển dateString thành LocalDate
			}
			Integer userID = null; 
			HttpSession session = request.getSession(false); // Lấy session hiện tại, nếu tồn tại
			if (session != null) {
				userID = (int) session.getAttribute("userID"); 
			}
			System.out.println(userID); // In ra userID để kiểm tra

			// Chuẩn bị dữ liệu phản hồi
			Map<String, Object> responseData = new HashMap<>(); // Tạo một Map để lưu trữ dữ liệu phản hồi
			responseData.put("status", "success"); // Thêm trạng thái phản hồi
			responseData.put("message", "Dữ liệu đã được nhận"); // Thêm tin nhắn xác nhận
			responseData.put("categoryID", categoryID); // Thêm categoryID vào phản hồi
			responseData.put("date", dateString); // Thêm ngày vào phản hồi
			responseData.put("amount", amount); // Thêm số tiền vào phản hồi

			// Lấy dữ liệu thu nhập (income) và chi tiêu (expense) theo categoryID, date, amount
			IncomeDAO incomes = new IncomeDAO(); 
			ExpenseDAO expenses = new ExpenseDAO();
			List<Income> listIncome = incomes.searchTransactions(userID, categoryID, date, amount); // Tìm kiếm giao dịch thu nhập
			List<Expense> listExpense = expenses.searchTransactions(userID, categoryID, date, amount); // Tìm kiếm giao dịch chi tiêu

			// Gộp tất cả vào một đối tượng phản hồi
			responseData.put("incomeList", listIncome); // Thêm danh sách thu nhập vào phản hồi
			responseData.put("expenseList", listExpense); // Thêm danh sách chi tiêu vào phản hồi

			// Ghi dữ liệu phản hồi
			PrintWriter out = response.getWriter(); // Lấy đối tượng PrintWriter để ghi phản hồi
			out.print(objectMapper.writeValueAsString(responseData)); // Ghi toàn bộ phản hồi dưới dạng JSON
			out.flush(); // Đảm bảo tất cả dữ liệu được gửi đi
		} catch (Exception e) {
			response.setContentType("text"); // Thiết lập kiểu nội dung là văn bản
			response.setCharacterEncoding("UTF-8"); // Thiết lập mã hóa UTF-8 cho phản hồi
			PrintWriter out = response.getWriter(); // Lấy đối tượng PrintWriter để ghi lỗi phản hồi
			out.print(e.getMessage()); // Ghi thông báo lỗi
			out.flush(); // Đảm bảo tất cả dữ liệu lỗi được gửi đi
		}
	}
}
