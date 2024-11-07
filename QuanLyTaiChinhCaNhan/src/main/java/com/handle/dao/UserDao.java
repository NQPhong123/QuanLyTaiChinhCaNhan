package com.handle.dao;

import com.handle.model.User;

import helper.BCrypt;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {

	public boolean saveUser(User user) {
		boolean status = false;
		Connection conn = ConnectDB.getInstance().getConnection();
		String encodePass = BCrypt.hashpw(user.getPassWord(), BCrypt.gensalt());
		if (conn != null) {
			try {
				String query = "INSERT INTO User(Email,PasswordHash) VALUES(?,?)";
				PreparedStatement ptst = conn.prepareStatement(query);
				ptst.setString(1, user.getEmail());
				ptst.setString(2, encodePass);
				status = ptst.executeUpdate() > 0;
				
			} catch (SQLException e) {
				e.getStackTrace();
				System.out.println(e.getMessage());
			}
		}
		return status;
	}

	// Kiểm tra người dùng có tồn tại
	public boolean checkUser(User user) {
		Connection conn = ConnectDB.getInstance().getConnection();
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
				System.out.println(e.getMessage());
			}
		}
		return status;
	}

    // Lấy thông tin người dùng dựa trên email
    public int getUserID(String email, String passWord) {
        User user = new User();
        user.setEmail(email);
        user.setPassWord(passWord);
        Connection conn = ConnectDB.getInstance().getConnection();
       if(checkUser(user)) {
           try  {
               String query = "SELECT * FROM User WHERE email = ?";
               PreparedStatement ptst = conn.prepareStatement(query);
               ptst.setString(1, email);
               ResultSet resultSet = ptst.executeQuery();

               if (resultSet.next()) {
                   int userID = resultSet.getInt("UserID");
                   user.setUserID(userID);
               }
           } catch (SQLException e) {
           	System.out.println(e.getMessage());
           }

       }
        return user.getUserID();
    }
    
}