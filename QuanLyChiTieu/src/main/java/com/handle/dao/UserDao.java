package com.handle.dao;

import com.handle.model.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {

    // Lưu người dùng
    public boolean saveUser(User user) {
        boolean status = false;
        Connection conn = ConnectDB.getConection();
        if (conn != null) {
            try {
                String query = "INSERT INTO User(Email,PasswordHash) VALUES(?,?)";
                PreparedStatement ptst = conn.prepareStatement(query);
                ptst.setString(1, user.getEmail());
                ptst.setString(2, user.getPassWord());
                status = ptst.executeUpdate() > 0;
                ConnectDB.closeConnection(conn);
            } catch (SQLException e) {
                e.getStackTrace();
                System.out.println(e.getMessage());
            }
        }
        return status;
    }

    // Kiểm tra email và mật khẩu có khớp không
    public boolean checkUser(User user) {
        Connection conn = ConnectDB.getConection();
        boolean status = false;
        if (conn != null) {
            try {
                String query = "SELECT * FROM User WHERE Email = ? AND PasswordHash = ?";
                PreparedStatement ptst = conn.prepareStatement(query);
                ptst.setString(1, user.getEmail());
                ptst.setString(2, user.getPassWord());
                ResultSet resultSet = ptst.executeQuery();
                // Nếu tìm thấy bản ghi, tức là email và mật khẩu đúng
                status = resultSet.next();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return status;
    }

    // Lấy thông tin người dùng dựa trên email
    public User getUserByEmail(String email) {
        User user = null;
        try (Connection connection = ConnectDB.getConection()) {
            String query = "SELECT * FROM User WHERE email = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, email);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                user = new User();
                user.setEmail(resultSet.getString("email"));
                user.setPassWord(resultSet.getString("password"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user;
    }
}
