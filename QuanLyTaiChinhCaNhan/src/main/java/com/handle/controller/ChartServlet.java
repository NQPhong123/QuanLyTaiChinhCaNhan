package com.handle.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.time.LocalDate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handle.dao.ExpenseDAO;
import com.handle.dao.IncomeDAO;
import com.handle.model.Expense;
import com.handle.model.Income;
import com.handle.model.RangeDate;

@WebServlet("/ChartServlet")
public class ChartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // Đọc nội dung yêu cầu
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String jsonString = sb.toString();

            // Tạo ObjectMapper và đăng ký JavaTimeModule để xử lý LocalDate
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());

            // Đọc dữ liệu JSON
            JsonNode jsonNode = objectMapper.readTree(jsonString);
            int selectedMonth = jsonNode.get("month").asInt();
            int year = LocalDate.now().getYear();
            int userID = Integer.parseInt(request.getSession().getAttribute("userID").toString());

            // Tính toán khoảng thời gian trong tháng
            LocalDate startDate = RangeDate.getStartOfMonth(year, selectedMonth);
            LocalDate endDate = RangeDate.getEndOfMonth(year, selectedMonth);
            RangeDate rangeDate = new RangeDate(startDate, endDate);

            // Lấy dữ liệu thu nhập từ IncomeDAO
            IncomeDAO incomes = new IncomeDAO();
            ExpenseDAO expenses = new ExpenseDAO();
            List<Income> listIncome = incomes.searchTransactions(userID, null, rangeDate, null);
            List<Expense> listExpense = expenses.searchTransactions(userID, null, rangeDate, null);

            // Chuẩn bị dữ liệu phản hồi
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("status", "success");
            
            responseData.put("rangeDate", rangeDate.toString());  // Sử dụng toString() để gửi theo định dạng yyyy-MM-dd - yyyy-MM-dd
            responseData.put("incomeList", listIncome);
            responseData.put("expenseList", listExpense);
            

            // Gửi dữ liệu phản hồi
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
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