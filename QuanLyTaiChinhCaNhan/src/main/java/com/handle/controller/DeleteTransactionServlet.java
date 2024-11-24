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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handle.dao.ExpenseDAO;
import com.handle.dao.IncomeDAO;

@WebServlet("/DeleteTransactionServlet")
public class DeleteTransactionServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
            JsonNode jsonNode = objectMapper.readTree(jsonStringTran);

            // Đọc các giá trị từ JSON
            String type = jsonNode.get("type").asText();
            int transactionID = jsonNode.get("transactionID").asInt();

            // Lấy userID từ session
            HttpSession session = request.getSession(false);
            Integer userID = null;
            if (session != null) {
                userID = (Integer) session.getAttribute("userID");
            }

            if (userID == null) {
                throw new IllegalStateException("User is not logged in.");
            }

            // Gọi DAO để xóa giao dịch
            if (type.equals("expense")) {
                ExpenseDAO expenseDAO = new ExpenseDAO();
                expenseDAO.DeleteTransactions(userID, transactionID);
            } else if (type.equals("income")) {
                IncomeDAO incomeDAO = new IncomeDAO();
                incomeDAO.DeleteTransactions(userID, transactionID);
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
