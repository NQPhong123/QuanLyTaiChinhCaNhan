package com.handle.dao;

import com.handle.model.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserDao {

	public boolean saveUser(User user) {
		boolean status = false;
		Connection conn = ConnectDB.getConection();
		if (conn != null) {
			try {
				String query = "INSERT INTO User(Email,PasswordHash) VALUES(?,?)";
				PreparedStatement ptst = conn.prepareStatement(query);
				ptst.setString(1, user.getEmail());
				ptst.setNString(2, user.getPassWord());
				status = ptst.executeUpdate() > 0;
				ConnectDB.closeConnection(conn);
			} catch (SQLException e) {
				e.getStackTrace();
				System.out.println(e.getMessage());
			}
		}
		return status;
	}
}
