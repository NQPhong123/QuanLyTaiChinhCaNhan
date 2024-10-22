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

@WebServlet("/ChartServlet")
public class ChartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Đọc dữ liệu từ body request
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String jsonString = sb.toString();

        // Phân tích dữ liệu JSON
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonString);
        String selectedMonthYear = jsonNode.get("monthYear").asText();  // Đọc dữ liệu tháng và năm

        // Chuẩn bị dữ liệu phản hồi
        Map<String, String> responseData = new HashMap<>();
        responseData.put("status", "success");
        responseData.put("message", "Tháng/Năm đã được lưu: " + selectedMonthYear);
        responseData.put("monthYear", selectedMonthYear);

        // Gửi phản hồi JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(objectMapper.writeValueAsString(responseData));
        out.flush();
    }
}
