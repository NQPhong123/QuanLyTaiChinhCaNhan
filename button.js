
        const item = document.querySelectorAll(".category-left-li"); // Chọn các phần tử li chứa menu con
        item.forEach(function(menu, index) {
        menu.addEventListener("click", function() {
            menu.classList.toggle("block"); // Thêm class 'block' để hiển thị menu con
    });
});

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
		  <div class="category-left">
		                  <ul>
		                      <li class="category-left-li "><p>Thuơng hiệu</p>
		                          <ul class="subcategory">
		                              <li><p>MACBOOK</p></li>
		                              <li><p>MACBOOK</p></li>
		                          </ul>
		                      </li>
							  <li class="category-left-li "><p>Thuơng hiệu</p>
							  	<ul class="subcategory">
							  		<li><p>MACB</p></li>
							  		<li><p>MACB</p></li>
							  	</ul>
							  </li>
		                      
		                  </ul>
		              </div>
	    </div>    
	</div>
	
	<div class="category-wrapper-right">
	    <input type="date" id="myID" placeholder="CHỌN NGÀY">
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




