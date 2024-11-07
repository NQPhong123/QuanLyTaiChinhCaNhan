
import Button from "./button.js";
const searchButton = new Button();
searchButton.htmlContent = `<div class="search-header">
  <button id="btn-close-form" onclick="searchButton.closeButton();"><i class="fa-solid fa-arrow-left-long"></i> </button>
  <h2>Tìm kiếm giao dịch</h2>
  <button id="excuteSearch-button">Tìm kiếm</button>
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
			<span>Chọn ngày</span>
		    <div id="date-picker">
		        <select id="year" class="date-select">
		            <option value="" selected>Năm</option>
		            <!-- JavaScript sẽ tự động tạo các tùy chọn năm -->
		        </select>

		        <select id="month" class="date-select">
		            <option value="" selected>Tháng</option>
		            <!-- JavaScript sẽ tự động tạo các tùy chọn tháng -->
		        </select>

		        <select id="day" class="date-select">
		            <option value="" selected>Ngày</option>
		            <!-- JavaScript sẽ tự động tạo các tùy chọn ngày dựa trên tháng và năm đã chọn -->
		        </select>
		    </div>
		</div>


  <div class="field amount">
  <div id="slider"></div>
  <p>Selected Range: <span id="selectedRange"></span></p>
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

function renderDateTime() {
	const yearSelect = document.getElementById("year");
	const monthSelect = document.getElementById("month");
	const daySelect = document.getElementById("day");

	// Tạo các tùy chọn năm từ 2000 đến 2030
	for (let year = 2000; year <= 2030; year++) {
		const option = document.createElement("option");
		option.value = year;
		option.textContent = year;
		yearSelect.appendChild(option);
	}

	// Tạo các tùy chọn tháng từ 1 đến 12
	for (let month = 1; month <= 12; month++) {
		const option = document.createElement("option");
		option.value = month;
		option.textContent = month;
		monthSelect.appendChild(option);
	}

	// Tạo ngày
	for (let day = 1; day <= 31; day++) {
		const option = document.createElement("option");
		option.value = day;
		option.textContent = day;
		daySelect.appendChild(option);
	}
}

function updateDays() {
	const daySelect = document.getElementById("day");
	const yearSelect = document.getElementById("year");
	const monthSelect = document.getElementById("month");
	daySelect.innerHTML = '<option value="" selected>Ngày</option>'; // Reset ngày
	const month = parseInt(monthSelect.value);
	const year = parseInt(yearSelect.value);

	// Xác định số ngày trong tháng và năm đã chọn
	if (month && year) {
		const daysInMonth = new Date(year, month, 0).getDate();
		for (let day = 1; day <= daysInMonth; day++) {
			const option = document.createElement("option");
			option.value = day;
			option.textContent = day;
			daySelect.appendChild(option);
		}
	}
}



// hàm lấy dữ liệu(ngày, số tiền) để tìm kiếm giao dịch người dùng chọn và đẩy dữ liệu lên server xử lý
function getDataForSearch() {
	document.getElementById('excuteSearch-button').addEventListener('click', function() {
		const yearSelect = document.getElementById("year");
		const monthSelect = document.getElementById("month");
		const daySelect = document.getElementById("day");
		const year = yearSelect.value || null;
		const month = monthSelect.value || null;
		const day = daySelect.value || null;
		const amountRangeArr = slider.noUiSlider.get(); // lấy khoảng giá trị của amount range trả về một mảng[min,max]
		
		const date = {
			year:year,
			month:month,
			day:day
		}
		const amountRange = {
			min:parseInt(amountRangeArr[0]),
			max:parseInt(amountRangeArr[1])
		}
		const categoryID = document.querySelector("#choose-category-btn-left span").getAttribute('id');

		pushData(categoryID, date, amountRange);
		console.log("categoryID " + categoryID);
		console.log("DATE " + date);
		console.log("Current slider value:", amountRange);
	})


}



// hàm này xử lý sự kiện cho việc chọn ngày tháng năm
function handleClickOnYearMonth() {
	const yearSelect = document.getElementById("year");
	const monthSelect = document.getElementById("month");
	// Sự kiện khi thay đổi năm
	yearSelect.addEventListener("change", function() {
		updateDays();
	});

	// Sự kiện khi thay đổi tháng
	monthSelect.addEventListener("change", function() {
		if (!yearSelect.value) {
			alert("Vui lòng chọn năm trước khi chọn tháng.");
			monthSelect.value = ""; // Đặt lại tháng về trống nếu chưa chọn năm
		} else {
			updateDays();
		}
	});
}

function nouiSliders(){
	const slider = document.getElementById('slider');
	noUiSlider.create(slider, {
	  start: [20, 80],        // Giá trị bắt đầu cho hai tay cầm
	  connect: true,          // Đoạn giữa hai tay cầm sẽ được tô màu
	  range: {
	    'min': 0,
	    'max': 100
	  }
	});

	// Cập nhật giá trị hiển thị khi người dùng kéo thanh trượt
	const selectedRange = document.getElementById('selectedRange');
	slider.noUiSlider.on('update', function (values) {
	  selectedRange.textContent = `${parseInt(values[0])} - ${parseInt(values[1])}`;
	});
}
// overide lại phương thức để thực thi 2 hàm riêng của searchButton
searchButton.openButton = function() {
	this.isOpen = true;
	const modal = document.createElement("div");
	modal.setAttribute("id", this.idName);
	modal.innerHTML = this.htmlContent;
	document.querySelector('nav').appendChild(modal);
	getDataForSearch();
	renderDateTime();
	handleClickOnYearMonth();
	nouiSliders();

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
			btnCategory.setAttribute('id',this.getAttribute('id'));
		});
	});
}
// nút chọn thể loại
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