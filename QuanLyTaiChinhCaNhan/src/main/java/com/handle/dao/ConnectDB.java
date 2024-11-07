package com.handle.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// Đối tượng kết nối cơ sở dữ liệu sử dụng design pattern singleton
public class ConnectDB {

	private static final String URL = "jdbc:mysql://localhost:3306/quanlychitieu";
	private static final String USER = "root";
	private static final String PASSWORD = "";
	// tạo một instance duy nhất
	private static ConnectDB instance;
	// tạo một kết nối duy nhất đến database
	private Connection connection;

	private ConnectDB() {
		try {
			// thiết lập kết nối trong constructor để khi tạo đối tượng sẽ tự kết nối
			connection = DriverManager.getConnection(URL, USER, PASSWORD);
			System.out.println("successfully connect database");

		} catch (SQLException e) {
			System.out.println("Failed connect database!");
			System.out.println(e.getMessage());
		}
	};

	public static ConnectDB getInstance() {
		if (instance == null) {
			instance = new ConnectDB();
		}
		return instance;
	}

	// Phương thức để lấy đối tượng Connection
	public Connection getConnection() {
		return connection;
	}


}
