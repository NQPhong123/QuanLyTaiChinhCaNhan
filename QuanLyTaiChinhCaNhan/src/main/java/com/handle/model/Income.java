package com.handle.model;

import java.time.LocalDate;

public class Income extends Transaction {
	private int incomeID;

	public Income() {
		super();
	}

	public Income(int incomeID, int userID, int categoryID, double amount, String decription, LocalDate date) {
		super(userID, categoryID, amount, decription, date);
		this.incomeID = incomeID;
	}

	public int getIncomeID() {
		return incomeID;
	}

	public void setIncomeID(int incomeID) {
		this.incomeID = incomeID;
	}

	@Override
	public String toString() {
		
		return super.toString()+"Income [incomeID=" + incomeID + "]";
	}

}
