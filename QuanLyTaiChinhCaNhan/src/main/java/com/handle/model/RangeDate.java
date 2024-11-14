package com.handle.model;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.LocalDate;

public class RangeDate {
	LocalDate startDate;
	LocalDate endDate;

	public RangeDate() {
	};

	public RangeDate(LocalDate startDate, LocalDate endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	 public static LocalDate getStartOfMonth(int year, int month) {
	        return LocalDate.of(year, month, 1);
	    }

	    public static LocalDate getEndOfMonth(int year, int month) {
	        YearMonth yearMonth = YearMonth.of(year, month);
	        return yearMonth.atEndOfMonth();
	    }
	    
	    @Override
	    public String toString() {
	        return startDate.toString() + " - " + endDate.toString();
	    }
	   
}
