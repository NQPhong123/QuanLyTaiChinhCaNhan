package com.handle.model;

public class User {

	private int userID;
	private String userName;
	private String email;
	private String passWord;

	public User() {
	}

	public User(int userID, String userName, String email, String passWord) {
		this.userID = userID;
		this.userName = userName;
		this.email = email;
		this.passWord = passWord;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	@Override
	public String toString() {
		return "User [userID=" + userID + ", userName=" + userName + ", email=" + email + ", passWord=" + passWord
				+ "]";
	}


	/* . */
}
