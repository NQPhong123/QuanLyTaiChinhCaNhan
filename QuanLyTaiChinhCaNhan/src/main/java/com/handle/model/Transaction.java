package com.handle.model;

import java.time.LocalDate;
// cho expense và income kế thừa
public class Transaction {

	private int userID;
	private int categoryID;
	private double amount;
	private String decription;
	private LocalDate Date;

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public int getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(int categoryID) {
		this.categoryID = categoryID;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getDecription() {
		return decription;
	}

	public void setDecription(String decription) {
		this.decription = decription;
	}

	public LocalDate getDate() {
		return Date;
	}

	public void setDate(LocalDate date) {
		Date = date;
	}

	public Transaction() {
	};

	public Transaction(int userID, int categoryID, double amount, String decription, LocalDate date) {
		this.userID = userID;
		this.categoryID = categoryID;
		this.amount = amount;
		this.decription = decription;
		Date = date;
	}

	@Override
	public String toString() {
		return "Transaction [userID=" + userID + ", categoryID=" + categoryID + ", amount=" + amount + ", decription="
				+ decription + ", Date=" + Date + "]";
	}
}
