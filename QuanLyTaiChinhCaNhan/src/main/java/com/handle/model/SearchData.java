package com.handle.model;

public class SearchData {
	private Integer categoryID;
	private RangeDate rangeDate;
	private AmountRange amountRange;

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
}
