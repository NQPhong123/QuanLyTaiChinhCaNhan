package com.handle.model;

public class Category {
	private int categoryID;
	private String CategoryName;
	private String Type;
	private String URLImage;

	public Category(int categoryID, String categoryName, String type, String URLImage) {
		super();
		this.categoryID = categoryID;
		this.CategoryName = categoryName;
		this.Type = type;
		this.URLImage = URLImage;
	}

	public int getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(int categoryID) {
		this.categoryID = categoryID;
	}

	public String getCategoryName() {
		return CategoryName;
	}

	public void setCategoryName(String categoryName) {
		CategoryName = categoryName;
	}

	public String getType() {
		return Type;
	}

	public void setType(String type) {
		Type = type;
	}

	public String getURLImage() {
		return URLImage;
	}

	public void setURLImage(String URLImage) {
		this.URLImage = URLImage;
	}

	@Override
	public String toString() {
		return "Category [categoryID=" + categoryID + ", CategoryName=" + CategoryName + ", Type=" + Type
				+ ", URLImage=" + URLImage + "]";
	}
}
