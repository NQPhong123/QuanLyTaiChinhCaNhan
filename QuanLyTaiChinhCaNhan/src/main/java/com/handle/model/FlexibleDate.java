package com.handle.model;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.Year;

//Đối tượng này cho phép linh hoạt về ngày, tháng, năm có thể null một trong 3
public class FlexibleDate {
	private Integer day;
	private Integer month;
	private Integer year;
	 public FlexibleDate() {}
	// Constructor cho phép null cho từng thành phần
	public FlexibleDate( Integer year,Integer month, Integer day) {
		this.day = day;
		this.month = month;
		this.year = year;
	}

	// Phương thức kiểm tra và trả về ngày tháng năm cụ thể nếu đầy đủ
	public LocalDate toLocalDate() {
		if (day != null && month != null && year != null) {
			return LocalDate.of(year, month, day);
		}
		return null; // Trả về null nếu không đủ thông tin.
	}

	// Trả về đối tượng YearMonth nếu chỉ có tháng và năm
	public YearMonth toYearMonth() {
		if (month != null && year != null) {
			return YearMonth.of(year, month);
		}
		return null;
	}

	// Trả về đối tượng Year nếu chỉ có năm
	public Year toYear() {
		if (year != null) {
			return Year.of(year);
		}
		return null;
	}

	// Kiểm tra độ đầy đủ của thông tin ngày tháng năm
	public boolean isExactDate() {
		return day != null && month != null && year != null;
	}

	public boolean isYearMonth() {
		return month != null && year != null && day == null;
	}

	public boolean isYearOnly() {
		return year != null && month == null && day == null;
	}

	@Override
	public String toString() {
		return "FlexibleDate [day=" + day + ", month=" + month + ", year=" + year + "]";
	}

	// Các getter và setter
	public Integer getDay() {
		return day;
	}

	public Integer getMonth() {
		return month;
	}

	public Integer getYear() {
		return year;
	}

	public void setDay(Integer day) {
		this.day = day;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public void setYear(Integer year) {
		this.year = year;
	}
}
