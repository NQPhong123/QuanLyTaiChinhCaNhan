package com.handle.model;

public class SearchData {
    private Integer categoryID;
    private FlexibleDate date;
    private AmountRange amountRange;

    // Getters và Setters.
    public Integer getCategoryID() { return categoryID; }
    public void setCategoryID(Integer categoryID) { this.categoryID = categoryID; }

    public FlexibleDate getDate() { return date; }
    public void setDate(FlexibleDate date) { this.date = date; }

    public AmountRange getAmountRange() { return amountRange; }
    public void setAmountRange(AmountRange amountRange) { this.amountRange = amountRange; }
}
