package com.handle.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.handle.model.Category;

// Đối tượng lấy dữ liệu của category
public class CategoryDAO {
	public List<Category> getAllCategory() {
		List<Category> categories = new ArrayList<>();
		String query = "SELECT * FROM category where true";
		
		
		try {
			Connection conn = ConnectDB.getInstance().getConnection();
			PreparedStatement ptst = conn.prepareStatement(query);
			ResultSet rs = ptst.executeQuery();
			while (rs.next()) {
				int categoryID = rs.getInt("CategoryID");
				String categoryName = rs.getString("CategoryName");
				String type = rs.getString("type");
				String URLImage = rs.getString("URL_Image");
				Category category = new Category(categoryID, categoryName, type, URLImage);
				categories.add(category);
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return categories;
	}

}