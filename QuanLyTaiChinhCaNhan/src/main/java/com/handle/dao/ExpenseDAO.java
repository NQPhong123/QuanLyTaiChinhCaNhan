package com.handle.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.handle.model.Expense;

public class ExpenseDAO extends TransactionDAO<Expense> {

	@Override
	public List<Expense> getAllByUserID(int userID) {
		List<Expense> expenses = new ArrayList<>();
		String query = "SELECT * FROM expense WHERE UserID = ?";

		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setInt(1, userID);
			try (ResultSet rs = ptst.executeQuery()) {
				while (rs.next()) {
					int exID = rs.getInt("ExpenseID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String description = rs.getString("description");
					LocalDate date = rs.getDate("Date").toLocalDate();

					Expense expense = new Expense(exID, uID, ceID, amt, description, date);
					expenses.add(expense);
				}
			}
		} catch (SQLException e) {
			System.out.println("Error retrieving expenses by UserID: " + e.getMessage());
		}
		return expenses;
	}

	@Override
	public List<Expense> getAllByCategoryID(int categoryID) {
		List<Expense> expenses = new ArrayList<>();
		String query = "SELECT * FROM expense WHERE CategoryID = ?";

		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setInt(1, categoryID);
			try (ResultSet rs = ptst.executeQuery()) {
				while (rs.next()) {
					int exID = rs.getInt("ExpenseID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String description = rs.getString("description");
					LocalDate date = rs.getDate("Date").toLocalDate();

					Expense expense = new Expense(exID, uID, ceID, amt, description, date);
					expenses.add(expense);
				}
			}
		} catch (SQLException e) {
			System.out.println("Error retrieving expenses by CategoryID: " + e.getMessage());
		}
		return expenses;
	}

	@Override
	public List<Expense> getAllByAmount(double amount) {
		List<Expense> expenses = new ArrayList<>();
		String query = "SELECT * FROM expense WHERE Amount = ?";

		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setDouble(1, amount);
			try (ResultSet rs = ptst.executeQuery()) {
				while (rs.next()) {
					int exID = rs.getInt("ExpenseID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String description = rs.getString("description");
					LocalDate date = rs.getDate("Date").toLocalDate();

					Expense expense = new Expense(exID, uID, ceID, amt, description, date);
					expenses.add(expense);
				}
			}
		} catch (SQLException e) {
			System.out.println("Error retrieving expenses by Amount: " + e.getMessage());
		}
		return expenses;
	}

	@Override
	public List<Expense> excuteQuerySearch(String query) {
		System.out.println("Executing query: " + query);
		List<Expense> expenses = new ArrayList<>();

		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ResultSet rs = ptst.executeQuery();

			while (rs.next()) {
				int exID = rs.getInt("ExpenseID");
				int uID = rs.getInt("UserID");
				int ceID = rs.getInt("categoryID");
				double amt = rs.getDouble("amount");
				String description = rs.getString("description");
				LocalDate date = rs.getDate("Date").toLocalDate();

				Expense expense = new Expense(exID, uID, ceID, amt, description, date);
				expenses.add(expense);
			}
		} catch (SQLException e) {
			System.out.println("Error executing query search: " + e.getMessage());
		}
		return expenses;
	}

	@Override
	public void InsertTransaction(int userID, int categoryID, LocalDate date, Double amount, String description)
			throws SQLException {

		String query = "INSERT INTO EXPENSE(userID,categoryID,date,amount,description) VALUES(?,?,?,?,?)";
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

	@Override
	public void UpdateTransasctions(int userID, int transactionID, int categoryID, LocalDate date, double amount,
			String description) {
		String query = "UPDATE expense SET categoryID = ?, amount = ?, description = ?, date = ? WHERE userID = ? AND expenseID = ?";
		try  {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setInt(1, categoryID);
			ptst.setDouble(2, amount);
			ptst.setString(3, description);
			ptst.setString(4, date.toString());
			ptst.setInt(5, userID);
			ptst.setInt(6, transactionID);
			int rowsUpdated = ptst.executeUpdate();
			System.out.println(rowsUpdated + " expense row(s) updated.");
		} catch (SQLException e) {
			System.out.println("Error at expense UPDATE TRANSACTION: " + e.getMessage());
		}
	}

	@Override
	public void DeleteTransactions(int userID, int transactionID) {
		String query = "DELETE FROM expense WHERE userID = ? AND expenseID = ?";
		try {Connection conn = ConnectDB.getInstance().getConnection();
		PreparedStatement ptst = conn.prepareStatement(query);
			ptst.setInt(1, userID);
			ptst.setInt(2, transactionID);
			int rowsUpdated = ptst.executeUpdate();
			System.out.println(rowsUpdated + " expense row(s)  deleted.");
		} catch (SQLException e) {
			System.out.println("Error at income DELETE TRANSACTION: " + e.getMessage());
		}
	}

	public static void main(String[] args) {

	}
}
