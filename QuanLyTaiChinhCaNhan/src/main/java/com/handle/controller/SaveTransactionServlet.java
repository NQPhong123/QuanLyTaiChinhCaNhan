package com.handle.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import com.handle.dao.ConnectDB;

@WebServlet("/saveTransaction")
public class SaveTransactionServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String type = request.getParameter("type");
        String category = request.getParameter("category");
        String amount = request.getParameter("amount");
        String date = request.getParameter("date");
        String note = request.getParameter("note");

        String table = "expense".equals(type) ? "expense" : "income";
        String query = "INSERT INTO " + table + " (CategoryID, Amount, Date, Note) VALUES (?, ?, ?, ?)";
        
        Connection conn = null;
        PreparedStatement ptst = null;
        
        try {
            // Get a connection from ConnectDB
            conn = ConnectDB.getConection();
            ptst = conn.prepareStatement(query);
            
            ptst.setInt(1, Integer.parseInt(category));
            ptst.setDouble(2, Double.parseDouble(amount));
            ptst.setString(3, date);
            ptst.setString(4, note);
            ptst.executeUpdate();
            
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("Giao dịch đã được lưu thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Lỗi khi lưu giao dịch!");
        } finally {
            // Close resources
            if (ptst != null) {
                try {
                    ptst.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            ConnectDB.closeConnection(conn);
        }
    }
}
