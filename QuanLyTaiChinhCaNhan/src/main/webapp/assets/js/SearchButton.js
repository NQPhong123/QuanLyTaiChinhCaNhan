
import Button from "./button.js";
const searchButton = new Button();
searchButton.htmlContent = `<div class="search-header">
  <button id="btn-close-form" onclick="searchButton.closeButton();"><i class="fa-solid fa-arrow-left-long"></i> </button>
  <h2>Tìm kiếm giao dịch</h2>
  <button class="reset-button">Reset</button>
</div>

<div class="search-form">
	<div class="category-wrapper">
	<div class="category-wrapper-right select-category">
	    <button id="choose-category-btn-left" onclick="selectSearchCategoryButton.openButton()">
	      <span>CHỌN THỂ LOẠI</span>
	      <i class="fa-regular fa-greater-than"></i>
	    </button>
		</div>


	
	<div class="category-wrapper-right select-date">
	    <button id="btn-choose-date">
	        <input type="date" id="inputDateSearch" placeholder="CHỌN NGÀY">
	    </button>
	</div>


  <div class="field amount">
    <label for="amount">Số tiền</label>
    <input type="range" id="amountSearch" min="10" max="7000" value="10" />
    <div class="range-values">
      <span>10</span>
      <span>7000</span>
    </div>
  </div>
</div>`;
searchButton.idName = "search-container";

const selectSearchCategoryButton = new Button();
selectSearchCategoryButton.htmlContent = `<div class="select-category-container">
        <div class="modal-header">
            <span>Select category</span>
            <button class="close-btn" onclick="selectSearchCategoryButton.closeButton()">X</button>
        </div>
        <div class="tabs">
            <button class="tab active expense-tab">EXPENSE</button>
            <button class="tab income-tab">INCOME</button>
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Search">
        </div>

        <!-- Expense Category List -->
        <div class="category-list expense-list">
   			<!-- danh sách được render tự động -->
        </div>

        <!-- Income Category List -->
        <div class="category-list income-list hidden">
			<!-- danh sách được render tự động -->
        </div>
   </div> `;
selectSearchCategoryButton.idName = "form-select-category"

import { fetchCategories } from "./api/CategoryApi.js";
import { pushData } from "./api/SearchApi.js";

// hàm tạo ra dánh sách thể loại
// async và await là để chờ hàm có await thực hiện xong thì nó mới bắt đầu thực hiện để đồng bộ dữ liệu
async function renderCategory() {
	const categories = await fetchCategories();
	const expenseList = document.querySelector('.expense-list');
	const incomeList = document.querySelector('.income-list');
	let expenseContent = '';
	let incomeContent = '';

	if (Array.isArray(categories)) {
		categories.forEach((category) => {
			if (category.type === 'Expense') {
				expenseContent += `<div class="category" id="${category.categoryID}">
						<img src="image/${category.urlimage}" alt="${category.categoryName}">
						<span>${category.categoryName}</span>
					</div>`;
			} else {
				incomeContent += `<div class="category" id="${category.categoryID}">
						<img src="image/${category.urlimage}" alt="${category.categoryName}">
						<span>${category.categoryName}</span>
					</div>`;
			}
		});
		expenseList.innerHTML += expenseContent;
		incomeList.innerHTML += incomeContent;
		handleCategoryClick();
	}
}


let selectedDate = null;
let selectedCategoryID = null;
let selectedAmount = null;
// hàm lấy dữ liệu(ngày, số tiền) để tìm kiếm giao dịch người dùng chọn và đẩy dữ liệu lên server xử lý
function getDataForSearch() {
	const inputDate = document.getElementById("inputDateSearch");

	const amount = document.getElementById("amountSearch");


	if (inputDate) {
		inputDate.removeEventListener("change", handleDateChange);
		inputDate.addEventListener("change", handleDateChange);
	}
	if (amount) {
		amount.removeEventListener("change", handleAmountChange);
		amount.addEventListener("change", handleAmountChange);
	}

}
// Hàm xử lý khi thay đổi ngày
function handleDateChange(event) {
	selectedDate = event.target.value;
	console.log(selectedDate);
	pushData(selectedCategoryID, selectedDate, selectedAmount);
}
// hàm xử lý khi thay đổi số tiền
function handleAmountChange(event) {
	selectedAmount = event.target.value;
	console.log(selectedAmount);
	pushData(selectedCategoryID, selectedDate, selectedAmount);
}
// overide lại phương thức để thực thi 2 hàm riêng của searchButton
searchButton.openButton = function() {
	this.isOpen = true;
	const modal = document.createElement("div");
	modal.setAttribute("id", this.idName);
	modal.innerHTML = this.htmlContent;
	document.querySelector('nav').appendChild(modal);
	getDataForSearch();
};


// xử lý sự kiện click của tab expense
function clickExpenseTab() {
	const expenseTab = document.querySelector('.expense-tab');
	const incomeTab = document.querySelector('.income-tab');
	const expenseList = document.querySelector('.expense-list');
	const incomeList = document.querySelector('.income-list');
	expenseTab.addEventListener('click', function() {
		expenseTab.classList.add('active');
		incomeTab.classList.remove('active');
		expenseList.classList.remove('hidden');
		incomeList.classList.add('hidden');
	});
}
// xử lý sự kiện click của tab income
function clickIncomeTab() {
	const expenseTab = document.querySelector('.expense-tab');
	const incomeTab = document.querySelector('.income-tab');
	const expenseList = document.querySelector('.expense-list');
	const incomeList = document.querySelector('.income-list');
	incomeTab.addEventListener('click', function() {
		incomeTab.classList.add('active');
		expenseTab.classList.remove('active');
		incomeList.classList.remove('hidden');
		expenseList.classList.add('hidden');
	});
}

// sử lý sự kiện click của button category
function handleCategoryClick() {
	const categories = document.querySelectorAll(".category");

	categories.forEach((category) => {
		category.addEventListener("click", function() {
			// bỏ những selected và checkmark của lần chọn trước
			categories.forEach((cat) => {
				cat.classList.remove("selected");
				const checkmark = cat.querySelector(".checkmark");
				if (checkmark) {
					cat.removeChild(checkmark);
				}
			});

			//chọn cái nào thì sẽ hiện thị dấu tích
			this.classList.add("selected");
			const span = document.createElement("span");
			span.className = "checkmark";
			span.textContent = "✔";
			this.appendChild(span);
			// thay đổi nội dung của button thể loại mỗi khi chọn
			const btnCategory = document.querySelector('#choose-category-btn-left span');
			const getCategoryName = document.querySelector(".category.selected span").innerHTML;
			btnCategory.textContent = getCategoryName;

			// lấy categoryID và đẩy dữ liệu lên server để search
			const categoryID = document.querySelector(".category.selected");
			selectedCategoryID = categoryID.getAttribute('id');
			console.log(selectedCategoryID);
			pushData(selectedCategoryID, selectedDate, selectedAmount);
		});
	});
}
selectSearchCategoryButton.openButton = function() {
	this.isOpen = true;
	const modal = document.createElement("div");
	modal.setAttribute("id", this.idName);
	modal.innerHTML = this.htmlContent;
	document.body.appendChild(modal);
	renderCategory();
	clickExpenseTab();
	clickIncomeTab();
};





// đưa 2 object này thành global vì sử dụng type = module

window.searchButton = searchButton;
window.selectSearchCategoryButton = selectSearchCategoryButton;