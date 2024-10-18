

// lớp Button tạo nút
class Button {
	constructor(htmlContent, idName) {
		this.htmlContent = htmlContent;
		this.idName = idName;
	}
	openButton() {

		this.isOpen = true;
		const modal = document.createElement('div');
		modal.setAttribute('id', this.idName);
		modal.innerHTML = this.htmlContent;
		document.body.appendChild(modal);


	}
	closeButton() {
		const modal = document.getElementById(this.idName);
		if (modal) {
			modal.remove();
		}
	}
}

const searchButton = new Button();
searchButton.htmlContent = `<div class="search-header">
  <button id="btn-close-form" onclick="searchButton.closeButton();"><i class="fa-solid fa-arrow-left-long"></i> </button>
  <h2>Tìm kiếm giao dịch</h2>
  <button class="reset-button">Reset</button>
</div>

<div class="search-form">
	<div class="category-wrapper">
	    <button id="choose-category-btn-left">
	      <span>CHỌN THỂ LOẠI</span>
	      <i class="fa-regular fa-greater-than"></i>
	    </button>
	    
	    <div class="category-selector">
	      <div class="header">
	        <span>Select category</span>
	      </div>
	
	      <div class="tabs">
	        <button class="tab active">DEBT/LOAN</button>
	        <button class="tab">EXPENSE</button>
	        <button class="tab">INCOME</button>
	      </div>
	
	      <ul class="category-list">
	        <li class="category-item">
	          <img src="icon1.png" alt="All Categories"> All Categories
	        </li>
	        <li class="category-item">
	          <img src="icon2.png" alt="Education"> Education
	        </li>
	        <li class="category-item selected">
	          <img src="icon3.png" alt="Food & Beverage"> Food & Beverage
	          <i class="fa fa-check"></i>
	        </li>
	        <li class="category-item">
	          <img src="icon4.png" alt="Gas Bill"> Gas Bill
	        </li>
	        <li class="category-item">
	          <img src="icon5.png" alt="Gifts & Donations"> Gifts & Donations
	        </li>
	        <li class="category-item">
	          <img src="icon6.png" alt="Home Maintenance"> Home Maintenance
	        </li>
	        <li class="category-item">
	          <img src="icon7.png" alt="Houseware"> Houseware
	        </li>
	        <li class="category-item">
	          <img src="icon8.png" alt="Investment"> Investment
	        </li>
	      </ul>
	
	    </div>    
	</div>
	
	<div class="category-wrapper-right">
	    <button id="choose-category-btn-right">
	        <input type="date" id="myID" placeholder="CHỌN NGÀY">
	    </button>
	</div>


  <div class="field amount">
    <label for="amount">Số tiền</label>
    <input type="range" id="amount" min="10" max="7000" value="10" />
    <div class="range-values">
      <span>10</span>
      <span>7000</span>
    </div>
  </div>
</div>`;
searchButton.idName = 'search-container';

flatpickr("#myID", {});

const addTransaction = new Button();
addTransaction.htmlContent = `
			<div>
            <h3>Thêm giao dịch</h3>

            <label for="vi">Ví</label>
            <select id="vi">
                <option>Tiền mặt</option>
            </select>

            <label for="nhom">Nhóm</label>
            <select id="nhom">
                <option>Chọn nhóm</option>
            </select>

            <label for="so-tien">Số tiền</label>
            <input type="number" id="so-tien" value="0">

            <label for="ngay">Ngày</label>
            <input type="date" id="ngay" value="2019-06-11">

            <label for="ghi-chu">Ghi chú</label>
            <input type="text" id="ghi-chu" placeholder="Ghi chú">

            <div class="transaction-btn-container">
                <button class="save-btn" disabled>Lưu</button>
                <button class="cancel-btn" onclick="addTransaction.closeButton()">Hủy</button>
            </div>
        </div>`;
addTransaction.idName = 'transactionForm'




