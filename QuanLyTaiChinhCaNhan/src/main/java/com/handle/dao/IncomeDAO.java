package com.handle.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


import com.handle.model.Income;

public class IncomeDAO extends TransactionDAO<Income> {

	@Override
	public List<Income> getAllByUserID(int userID) {
		List<Income> incomes = new ArrayList<>();
		String query = "SELECT * FROM income WHERE UserID = ?";
		try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query)) {
			ptst.setInt(1, userID);
			ResultSet rs = ptst.executeQuery();
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
		try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query)) {
			ptst.setInt(1, categoryID);
			ResultSet rs = ptst.executeQuery();
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
		try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query)) {
			ptst.setDouble(1, amount);
			ResultSet rs = ptst.executeQuery();
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
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return incomes;
	}
	@Override
	public List<Income> excuteQuerySearch(String query){
		 System.out.println("Executing query: " + query);
		 List<Income> incomes = new ArrayList<>();
		 try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query);) {
				ResultSet rs = ptst.executeQuery();
				while(rs.next()) {
					int exID = rs.getInt("ExpenseID");
					int uID = rs.getInt("UserID");
					int ceID = rs.getInt("categoryID");
					double amt = rs.getDouble("amount");
					String deciption = rs.getString("description");
					LocalDate date = rs.getDate("Date").toLocalDate();
					Income income = new Income(exID,uID,ceID,amt,deciption,date);
					incomes.add(income);
				}
			} catch (SQLException e) {
				e.getStackTrace();
				System.out.println(e.getMessage());
			}
		 return incomes;
	}
	
	
	
}
