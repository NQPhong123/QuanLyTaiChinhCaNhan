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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;



import com.handle.dao.IncomeDAO;

import java.time.LocalDate;
import java.util.List;
import com.handle.model.Income;


@WebServlet("/ChartServlet")
public class ChartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String jsonString = sb.toString();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonString);
        int selectedMonth = jsonNode.get("month").asInt();
        int year = LocalDate.now().getYear();
        int userID = Integer.parseInt(request.getSession().getAttribute("userID").toString());

        // Lấy dữ liệu thu nhập từ IncomeDAO
        IncomeDAO incomeDAO = new IncomeDAO();
        List<Income> incomes = incomeDAO.getIncomesByMonth(userID, year, selectedMonth);

        // Chuẩn bị dữ liệu phản hồi
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("status", "success");
        responseData.put("message", "Tháng đã được lưu: " + selectedMonth);
        responseData.put("incomes", incomes);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(objectMapper.writeValueAsString(responseData));
        out.flush();
    }
}
