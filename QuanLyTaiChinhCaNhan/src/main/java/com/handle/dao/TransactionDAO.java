package com.handle.dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

import com.handle.model.AmountRange;

import com.handle.model.RangeDate;

// <T> dùng generic để tạo template cho nhiều đối tượng sử dụng
public abstract class TransactionDAO<T> {
	public abstract List<T> getAllByUserID(int userID); // hàm lấy tất cả Transaction theo userID

	public abstract List<T> getAllByCategoryID(int categoryID);// hàm lấy tất cả Transaction theo categoryID

	public abstract List<T> getAllByAmount(double amount);// hàm lấy tất cả Transaction theo amount

	// hàm tìm kiếm giao dịch theo từng điều kiện
	public List<T> searchTransactions(Integer userID, Integer categoryID, RangeDate rangeDate,
			AmountRange amountRange) {
		StringBuilder query = new StringBuilder("SELECT *  FROM " + getGenericTypeName() + " WHERE UserID = " + userID);
		if (categoryID != null) {
			query.append(" AND CategoryID=").append(categoryID);
		}
		if (rangeDate != null) {
			query.append(" AND date BETWEEN '" + rangeDate.getStartDate())
					.append("' AND '" + rangeDate.getEndDate() + "'");
		}
		if (amountRange != null) {
			query.append(" AND amount BETWEEN ").append(amountRange.getMin()).append(" AND " + amountRange.getMax());
		}
		query.append(" ORDER BY DATE DESC");
		return excuteQuerySearch(query.toString());
	}

	public abstract List<T> excuteQuerySearch(String query); // hàm thực thi các lệnh query đã được khai báo ở
																// searchTransactions cho từng lớp con

	// hàm abstract này dùng để insert một transaction vào database
	public abstract void InsertTransaction(int userID, int categoryID, LocalDate date, Double amount,
			String description) throws SQLException;

	// hàm sửa giao dịch
	public abstract void UpdateTransasctions(int userID, int transactionID, int categoryID, LocalDate date,
			double amount, String description);

	//hàm xóa giao dịch
	public abstract void DeleteTransactions(int userID, int transactionID);
	
	// Hàm lấy tên kiểu genneric vì khi <T> runtime sẽ không tồn tại thông tin về
	// kiểu sẽ được khai báo ở các lớp con
	@SuppressWarnings("unchecked")
	private String getGenericTypeName() {
		return ((Class<T>) ((java.lang.reflect.ParameterizedType) getClass().getGenericSuperclass())
				.getActualTypeArguments()[0]).getSimpleName();
	}
}
