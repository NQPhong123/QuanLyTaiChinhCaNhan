// lớp Button tạo nút
class Button {
  constructor(htmlContent, idName) {
    this.htmlContent = htmlContent;
    this.idName = idName;
  }
  openButton() {
    this.isOpen = true;
    const modal = document.createElement("div");
    modal.setAttribute("id", this.idName);
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

// Đảm bảo rằng fetchCategories đã được định nghĩa trước khi gọi

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
		  <!-- danh sách thể loại sẽ được render động-->
	      </ul>
	
	    </div>    
	</div>
	
	<div class="category-wrapper-right">
	    <button id="btn-choose-date">
	        <input type="date" id="inputDate" placeholder="CHỌN NGÀY">
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
searchButton.idName = "search-container";

// hàm lấy ngày được chọn

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
addTransaction.idName = "transactionForm";



import { fetchCategories } from "./api/CategoryApi.js";
import {pushData} from "./api/SearchApi.js";

// hàm xử lý thể loại được lấy từ database tạo ra các thẻ li tương ứng
async function getCategories() {
  try {
    const categories = await fetchCategories();
    console.log(categories); // In ra để kiểm tra
    let li = "";
    if (Array.isArray(categories)) {
      categories.forEach((category) => {
        li += `<li class="category-item">
				  <img src="${category.urlimage}" alt="${category.categoryName}"> ${category.categoryName}
				</li>`;
      });
    } else {
      console.error("Expected categories to be an array, but got:", categories);
    }
    return li;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}
// Hàm format số tiền
function formatCurrency(amount) {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
}
// hàm tạo ra dánh sách thể loại
async function renderCategoryList() {
  const categoryListElement = document.querySelector(".category-list");
  if (categoryListElement) {
    const categoryItems = await getCategories();
    categoryListElement.innerHTML = categoryItems;
  }
}

// hàm lấy ngày người dùng chọn và đẩy dữ liệu lên server xử lý
function addDateChangeListener() {
  const inputDate = document.getElementById("inputDate");
  if (inputDate) {
    inputDate.addEventListener("change", (event) => {
      const selectedDate = event.target.value; // Lấy giá trị ngày đã chọn
      console.log(selectedDate);
      pushData(selectedDate); 
    });
  }
}


// overide lại phương thức để thực thi 2 hàm riêng của searchButton
searchButton.openButton = function () {
  this.isOpen = true;
  const modal = document.createElement("div");
  modal.setAttribute("id", this.idName);
  modal.innerHTML = this.htmlContent;
  document.body.appendChild(modal);
  renderCategoryList();
  addDateChangeListener();
};

// đưa 2 object này thành global vì sử dụng type = module
window.searchButton = searchButton;
window.addTransaction = addTransaction;
