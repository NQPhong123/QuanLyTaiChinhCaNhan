package com.handle.dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

import com.handle.model.AmountRange;
import com.handle.model.FlexibleDate;

// <T> dùng generic để tạo template cho nhiều đối tượng sử dụng
public abstract class TransactionDAO<T> {
	public abstract List<T> getAllByUserID(int userID); // hàm lấy tất cả Transaction theo userID

	public abstract List<T> getAllByCategoryID(int categoryID);// hàm lấy tất cả Transaction theo categoryID

	public abstract List<T> getAllByAmount(double amount);// hàm lấy tất cả Transaction theo amount

	// hàm tìm kiếm giao dịch theo từng điều kiện
	public List<T> searchTransactions(Integer userID, Integer categoryID, FlexibleDate date, AmountRange amountRange) {
		StringBuilder query = new StringBuilder("SELECT *  FROM " + getGenericTypeName() + " WHERE UserID = " + userID);
		if (categoryID != null) {
			query.append(" AND CategoryID=").append(categoryID);
		}
		if (date.isExactDate()) {
			query.append(" AND Date='").append(date.toLocalDate() + "'");
		} else if (date.isYearMonth()) {
			query.append(" AND YEAR(date)='").append(date.getYear() + "'").append("AND MONTH(date)='")
					.append(date.getMonth() + "'");
		} else if (date.isYearOnly()) {
			query.append(" AND YEAR(date)='").append(date.getYear() + "'");
		}
		if (amountRange != null) {
			query.append(" AND amount BETWEEN ").append(amountRange.getMin()).append(" AND " + amountRange.getMax());
		}
		return excuteQuerySearch(query.toString());
	}

	public abstract List<T> excuteQuerySearch(String query); // hàm thực thi các lệnh query đã được khai báo ở
																// searchTransactions cho từng lớp con

	// hàm abstract này dùng để insert một transaction vào database
	public abstract void InsertTransaction(int userID, int categoryID, LocalDate date, Double amount,
			String description) throws SQLException;

	// Hàm lấy tên kiểu genneric vì khi <T> runtime sẽ không tồn tại thông tin về
	// kiểu sẽ được khai báo ở các lớp con
	@SuppressWarnings("unchecked")
	private String getGenericTypeName() {
		return ((Class<T>) ((java.lang.reflect.ParameterizedType) getClass().getGenericSuperclass())
				.getActualTypeArguments()[0]).getSimpleName();
	}
}
