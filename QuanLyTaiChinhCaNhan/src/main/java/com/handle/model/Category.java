package com.handle.model;

public class Category {
	private int categoryID;
	private String CategoryName;
	private String Type;

	public Category(int categoryID, String categoryName, String type) {
		this.categoryID = categoryID;
		CategoryName = categoryName;
		Type = type;
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

	@Override
	public String toString() {
		return "Category [categoryID=" + categoryID + ", CategoryName=" + CategoryName + ", Type=" + Type + "]";
	}
}
