package com.handle.model;

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

}