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
	// Phương thức lấy tên category từ categoryID
    public String getCategoryNameByID(int categoryID) {
        String categoryName = null;
        String query = "SELECT CategoryName FROM category WHERE CategoryID = ?";
        
        try {
            Connection conn = ConnectDB.getInstance().getConnection();
            PreparedStatement ptst = conn.prepareStatement(query);
            ptst.setInt(1, categoryID);
            ResultSet rs = ptst.executeQuery();
            
            if (rs.next()) {
                categoryName = rs.getString("CategoryName");
            }
        } catch (SQLException e) {
            System.out.println("Error fetching category name: " + e.getMessage());
        }
        
        return categoryName;
    }
    
    
 // Phương thức lấy URL_Image từ categoryID
    public String getCategoryImageURLByID(int categoryID) {
        String URL_Image  = null;
        String query = "SELECT URL_Image FROM category WHERE CategoryID = ?";
        
        try {
            // Kết nối đến cơ sở dữ liệu
            Connection conn = ConnectDB.getInstance().getConnection();
            
            // Chuẩn bị câu lệnh SQL với tham số categoryID
            PreparedStatement ptst = conn.prepareStatement(query);
            ptst.setInt(1, categoryID);
            
            // Thực thi câu lệnh truy vấn
            ResultSet rs = ptst.executeQuery();
            
            // Kiểm tra nếu có dữ liệu trả về và lấy URL_Image
            if (rs.next()) {
            	URL_Image = rs.getString("URL_Image");
            }
        } catch (SQLException e) {
            System.out.println("Error fetching category image URL: " + e.getMessage());
        }
        
        return URL_Image;
    }

}
