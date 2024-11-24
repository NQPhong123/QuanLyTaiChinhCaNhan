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

@WebServlet("/UpdateTransactionServlet")
public class UpdateTransactionServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // Đọc JSON từ request
            StringBuilder jsonSbTran = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonSbTran.append(line);
            }
            String jsonStringTran = jsonSbTran.toString();

            // Chuyển đổi JSON thành JsonNode
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            JsonNode jsonNode = objectMapper.readTree(jsonStringTran);

            // Đọc các giá trị từ JSON
            int categoryID = jsonNode.get("categoryID").asInt();
            String dateString = jsonNode.get("date").asText();
            double amount = jsonNode.get("amount").asDouble();
            String description = jsonNode.get("description").asText();
            String type = jsonNode.get("type").asText();
            int transactionID = jsonNode.get("transactionID").asInt();

            // Chuyển đổi ngày
            LocalDate date = null;
            if (dateString != null) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                date = LocalDate.parse(dateString, formatter);
            }

            // Lấy userID từ session
            HttpSession session = request.getSession(false);
            Integer userID = null;
            if (session != null) {
                userID = (Integer) session.getAttribute("userID");
            }

            if (userID == null) {
                throw new IllegalStateException("User is not logged in.");
            }

            // Gọi DAO để cập nhật giao dịch
            if (type.equals("expense")) {
                ExpenseDAO expenseDAO = new ExpenseDAO();
                expenseDAO.UpdateTransasctions(userID, transactionID, categoryID, date, amount, description);
            } else if (type.equals("income")) {
                IncomeDAO incomeDAO = new IncomeDAO();
                incomeDAO.UpdateTransasctions(userID, transactionID, categoryID, date, amount, description);
            }

            // Phản hồi thành công
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.write("{\"status\": \"success\"}");
            out.flush();
        } catch (Exception e) {
            // Xử lý lỗi
            e.printStackTrace();
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            PrintWriter out = response.getWriter();
            out.write("{\"status\": \"error\", \"message\": \"" + e.getMessage() + "\"}");
            out.flush();
        }
    }
}
