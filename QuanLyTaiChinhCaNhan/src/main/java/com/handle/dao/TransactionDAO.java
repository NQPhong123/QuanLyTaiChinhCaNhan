package com.handle.dao;


import java.util.List;
// <T> dùng generic để tạo template cho nhiều đối tượng sử dụng
public abstract class TransactionDAO<T> {
		public abstract List<T> getAllByUserID(int userID); // hàm lấy tất cả Transaction theo userID
		public abstract List<T> getAllByCategoryID(int categoryID);// hàm lấy tất cả Transaction theo categoryID
		public abstract List<T> getAllByAmount(double amount);// hàm lấy tất cả Transaction theo amount
}
