package com.handle.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectDB {
	private static final String URL = "jdbc:mysql://localhost:3307/quanlychitieu";
	private static final String USER = "root";
	private static final String PASSWORD = "";

	public static Connection getConection() {
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(URL, USER, PASSWORD);
			System.out.println("successfully connect database");
		} catch (SQLException e) {
			System.out.println("Failed connect database!");
			e.printStackTrace();
		}
		return conn;
	}

	public static void closeConnection(Connection conn) {
		if (conn != null) {
			try {
				conn.close();
				System.out.println("Đóng kết nối thành công!");
			} catch (SQLException e) {
				System.out.println("Lỗi khi đóng kết nối!");
				e.printStackTrace();
			}
		}
	}

}
