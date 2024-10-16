package com.handle.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.handle.model.Category;

public class CategoryDAO {
	public List<Category> getAllCategory() {
		List<Category> categories = new ArrayList<>();
		String query = "SELECT * FROM category where true";
		try (Connection conn = ConnectDB.getConection(); PreparedStatement ptst = conn.prepareStatement(query);) {
			ResultSet rs = ptst.executeQuery();
			while (rs.next()) {
				int categoryID = rs.getInt("CategoryID");
				String categoryName = rs.getString("CategoryName");
				String type = rs.getString("type");
				Category category = new Category(categoryID, categoryName, type);
				categories.add(category);
			}
		} catch (SQLException e) {
			System.out.println(e.getStackTrace());
		}
		return categories;
	}
	
}
