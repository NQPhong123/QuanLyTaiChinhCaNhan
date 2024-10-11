package com.handle.dao;

import com.handle.model.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import helper.BCrypt;

public class UserDao {

	// Lưu người dùng
	public boolean saveUser(User user) {
		boolean status = false;
		Connection conn = ConnectDB.getConection();
		String encodePass = BCrypt.hashpw(user.getPassWord(), BCrypt.gensalt());
		if (conn != null) {
			try {
				String query = "INSERT INTO User(Email,PasswordHash) VALUES(?,?)";
				PreparedStatement ptst = conn.prepareStatement(query);
				ptst.setString(1, user.getEmail());
				ptst.setString(2, encodePass);
				status = ptst.executeUpdate() > 0;
				ConnectDB.closeConnection(conn);
			} catch (SQLException e) {
				e.getStackTrace();
				System.out.println(e.getMessage());
			}
		}
		return status;
	}

	// Kiểm tra người dùng có tồn tại
	public boolean checkUser(User user) {
		Connection conn = ConnectDB.getConection();
		boolean status = false;
		if (conn != null) {
			try {
				String query = "SELECT PasswordHash FROM User WHERE Email = ?";
				PreparedStatement ptst = conn.prepareStatement(query);
				ptst.setString(1, user.getEmail());
				ResultSet resultSet = ptst.executeQuery();
				while (resultSet.next()) {
					String passwordHash = resultSet.getString("PasswordHash");
					status = BCrypt.checkpw(user.getPassWord(), passwordHash);
				}

			} catch (SQLException e) {
				e.getStackTrace();
				System.out.println(e.getMessage());
			}
		}
		return status;
	}

}
