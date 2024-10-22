package com.handle.model;

import java.time.LocalDate;

public class Expense extends Transaction{
	private int expenseID;

	public Expense() {
		super();
	}

	public Expense(int expenseID,int userID, int categoryID, double amount, String decription, LocalDate date) {
		super(userID, categoryID, amount, decription, date);
		this.expenseID = expenseID;
	}

	public int getExpenseID() {
		return expenseID;
	}

	public void setExpenseID(int expenseID) {
		this.expenseID = expenseID;
	}

	@Override
	public String toString() {
	    return super.toString() + " Expense [expenseID=" + expenseID + "]";
	}



}
