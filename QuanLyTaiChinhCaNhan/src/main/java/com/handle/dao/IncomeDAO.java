package com.handle.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.handle.model.Income;
import com.handle.model.RangeDate;

public class IncomeDAO extends TransactionDAO<Income> {

	@Override
	public List<Income> getAllByUserID(int userID) {
		List<Income> incomes = new ArrayList<>();
		String query = "SELECT * FROM income WHERE UserID = ?";
		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setInt(1, userID);
			try (ResultSet rs = ptst.executeQuery()) {
				while (rs.next()) {
					int incID = rs.getInt("IncomeID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String description = rs.getString("description");
					LocalDate date = rs.getDate("IncomeDate").toLocalDate();
					Income income = new Income(incID, uID, ceID, amt, description, date);
					incomes.add(income);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return incomes;
	}

	@Override
	public List<Income> getAllByCategoryID(int categoryID) {
		List<Income> incomes = new ArrayList<>();
		String query = "SELECT * FROM income WHERE CategoryID = ?";
		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setInt(1, categoryID);
			try (ResultSet rs = ptst.executeQuery()) {
				while (rs.next()) {
					int incID = rs.getInt("IncomeID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String description = rs.getString("description");
					LocalDate date = rs.getDate("IncomeDate").toLocalDate();
					Income income = new Income(incID, uID, ceID, amt, description, date);
					incomes.add(income);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return incomes;
	}

	@Override
	public List<Income> getAllByAmount(double amount) {
		List<Income> incomes = new ArrayList<>();
		String query = "SELECT * FROM income WHERE amount = ?";
		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setDouble(1, amount);
			try (ResultSet rs = ptst.executeQuery()) {
				while (rs.next()) {
					int incID = rs.getInt("IncomeID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String description = rs.getString("description");
					LocalDate date = rs.getDate("IncomeDate").toLocalDate();
					Income income = new Income(incID, uID, ceID, amt, description, date);
					incomes.add(income);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return incomes;
	}

	@Override
	public List<Income> excuteQuerySearch(String query) {
		System.out.println("Executing query: " + query);
		List<Income> incomes = new ArrayList<>();
		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			try (ResultSet rs = ptst.executeQuery()) {
				while (rs.next()) {
					int exID = rs.getInt("IncomeID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String description = rs.getString("description");
					LocalDate date = rs.getDate("Date").toLocalDate();
					Income income = new Income(exID, uID, ceID, amt, description, date);
					incomes.add(income);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return incomes;
	}

	@Override
	public void InsertTransaction(int userID, int categoryID, LocalDate date, Double amount, String description)
			throws SQLException {

		String query = "INSERT INTO income(userID,categoryID,date,amount,description) VALUES(?,?,?,?,?)";
		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setInt(1, userID);
			ptst.setInt(2, categoryID);
			ptst.setObject(3, date);
			ptst.setDouble(4, amount);
			ptst.setString(5, description);

			int rowInserted = ptst.executeUpdate();
			if (rowInserted > 0) {
				System.out.println("Dữ liệu đã được chèn thành công!");
			}
		} catch (SQLException e) {
			throw new SQLException("Lỗi khi chèn dữ liệu: " + e.getMessage(), e); // Ném lỗi cho hàm khác xử lý
		}
	}

	public static void main(String[] args) {
		
		  IncomeDAO incomeDAO = new IncomeDAO(); 
	        LocalDate startDate = LocalDate.of(2024, 10, 1);
	        LocalDate endDate = LocalDate.of(2024, 11, 20);
	        RangeDate rangeDate = new RangeDate(startDate, endDate);
	        List<Income> transactions = incomeDAO.searchTransactions(1, null, rangeDate, null);
	        for (Income transaction : transactions) {
	            System.out.println(transaction);
	        }
	}
}
