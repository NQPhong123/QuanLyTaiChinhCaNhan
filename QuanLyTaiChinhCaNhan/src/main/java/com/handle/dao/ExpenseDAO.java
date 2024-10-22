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
	public  List<Expense> getAllByUserID(int userID) {
		List<Expense> expenses = new ArrayList<>();
		String query = "SELECT * FROM expense WHERE UserID = ?";
		try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query);) {
			ptst.setInt(1,userID);
			ResultSet rs = ptst.executeQuery();
			while(rs.next()) {
				int exID = rs.getInt("ExpenseID");
				int uID = rs.getInt("UserID");
				int ceID = rs.getInt("categoryID");
				double amt = rs.getDouble("amount");
				String deciption = rs.getString("description");
				LocalDate date = rs.getDate("Date").toLocalDate();
				Expense expense = new Expense(exID,uID,ceID,amt,deciption,date);
				expenses.add(expense);
			}
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
		}
		return expenses;
	}

	@Override
	public List<Expense> getAllByCategoryID(int categoryID) {
		List<Expense> expenses = new ArrayList<>();
		String query = "SELECT * FROM expense WHERE CategoryID = ?";
		try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query);) {
			ptst.setInt(1,categoryID);
			ResultSet rs = ptst.executeQuery();
			while(rs.next()) {
				int exID = rs.getInt("ExpenseID");
				int uID = rs.getInt("UserID");
				int ceID = rs.getInt("categoryID");
				double amt = rs.getDouble("amount");
				String deciption = rs.getString("description");
				LocalDate date = rs.getDate("Date").toLocalDate();
				Expense expense = new Expense(exID,uID,ceID,amt,deciption,date);
				expenses.add(expense);
			}
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
		}
		return expenses;
	}

	@Override
	public List<Expense> getAllByAmount(double amount) {
		List<Expense> expenses = new ArrayList<>();
		String query = "SELECT * FROM expense WHERE Amount = ?";
		try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query);) {
			ptst.setDouble(1,amount);
			ResultSet rs = ptst.executeQuery();
			while(rs.next()) {
				int exID = rs.getInt("ExpenseID");
				int uID = rs.getInt("UserID");
				int ceID = rs.getInt("categoryID");
				double amt = rs.getDouble("amount");
				String deciption = rs.getString("description");
				LocalDate date = rs.getDate("Date").toLocalDate();
				Expense expense = new Expense(exID,uID,ceID,amt,deciption,date);
				expenses.add(expense);
			}
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
		}
		return expenses;
	}

	@Override
	public List<Expense> excuteQuerySearch(String query){
		 System.out.println("Executing query: " + query);
		 List<Expense> expenses = new ArrayList<>();
		 try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query);) {
				ResultSet rs = ptst.executeQuery();
				while(rs.next()) {
					int exID = rs.getInt("ExpenseID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String deciption = rs.getString("description");
					LocalDate date = rs.getDate("Date").toLocalDate();
					Expense expense = new Expense(exID,uID,ceID,amt,deciption,date);
					expenses.add(expense);
				}
			} catch (SQLException e) {
				
				System.out.println(e.getMessage());
			}
		 return expenses;
	}
	
	
	public static void main(String[] args) {
    	ExpenseDAO expenseDAO = new ExpenseDAO();

        // Tìm kiếm expense với categoryID = 1
        List<Expense> expenses = expenseDAO.searchTransactions(1, null, null);

        // Vòng lặp để show thông tin của các expense
        for (Expense expense : expenses) {
            System.out.println(expense.toString()); // In ra thông tin của từng expense
        }

        // Tìm kiếm expense với categoryID = 1 và ngày giao dịch cụ thể
        List<Expense> expensesWithDate = expenseDAO.searchTransactions(1, LocalDate.of(2023, 10, 10), null);

        for (Expense expense : expensesWithDate) {
            System.out.println(expense.toString());
        }

        // Tìm kiếm expense với categoryID = 1, ngày và số tiền cụ thể
        List<Expense> expensesWithDateAndAmount = expenseDAO.searchTransactions(null, LocalDate.of(2023, 10, 10), 500.0);

        for (Expense expense : expensesWithDateAndAmount) {
            System.out.println(expense.toString());
        }
	}
}
