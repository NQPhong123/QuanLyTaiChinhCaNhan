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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handle.dao.ConnectDB;
// file này dùng để xử lý dữ liệu từ user và lưu Transaction
@WebServlet("/SaveTransaction")
public class SaveTransactionServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
        	StringBuilder jsonSbTran = new StringBuilder(); // dùng để lưu stringJson từ request
        	BufferedReader reader = request.getReader();
            String line;
            while((line = reader.readLine()) != null) {
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
            String decription = jsonNode.get("decription").asText();
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
			responseData.put("transactionType", transactionType);
			responseData.put("categoryID", categoryID); // Thêm categoryID vào phản hồi
			responseData.put("date", dateString); // Thêm ngày vào phản hồi
			responseData.put("amount", amount); // Thêm số tiền vào phản hồi
			responseData.put("decription", decription);
			
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
