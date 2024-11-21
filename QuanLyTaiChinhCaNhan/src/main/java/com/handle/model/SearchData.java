package com.handle.model;

public class SearchData {
	private Integer categoryID;
	private RangeDate rangeDate;
	private AmountRange amountRange;
	private String categoryName;
	private String URL_Image;
	
	// Getters và Setters.
	public Integer getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(Integer categoryID) {
		this.categoryID = categoryID;
	}

	public RangeDate getRangeDate() {
		return rangeDate;
	}

	public void setRangeDate(RangeDate rangeDate) {
		this.rangeDate = rangeDate;
	}

	public AmountRange getAmountRange() {
		return amountRange;
	}

	public void setAmountRange(AmountRange amountRange) {
		this.amountRange = amountRange;
	}
	public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public String getURL_Image() {
        return URL_Image;
    }

    public void setURL_Image(String URL_Image) {
        this.URL_Image = URL_Image;
    }
}
