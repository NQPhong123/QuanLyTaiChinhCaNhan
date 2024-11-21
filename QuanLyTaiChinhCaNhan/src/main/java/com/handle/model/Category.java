package com.handle.model;

public class Category {
	private int categoryID;
	private String CategoryName;
	private String Type;
	private String URL_Image;

	public Category(int categoryID, String categoryName, String type, String URL_Image) {
		super();
		this.categoryID = categoryID;
		this.CategoryName = categoryName;
		this.Type = type;
		this.URL_Image = URL_Image;
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
		return URL_Image;
	}

	public void setURLImage(String URLImage) {
		this.URL_Image = URLImage;
	}

	@Override
	public String toString() {
		return "Category [categoryID=" + categoryID + ", CategoryName=" + CategoryName + ", Type=" + Type
				+ ", URL_Image=" + URL_Image + "]";
	}
}
