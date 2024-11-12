
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
		<!-- Nút mở form chọn khoảng thời gian -->
		<button id="btn-open-time-range" onclick="timeRangeButton.openButton()">
		    <span>Select time range</span>
		</button>
		
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



const timeRangeButton = new Button();
timeRangeButton.htmlContent = `
<!-- Form chọn thời gian -->
    <div class="modal-content">
	<button class="close-btn" onclick="timeRangeButton.closeButton()">&times;</button>
        <h2>Select Time Range</h2>
        <ul class="time-range-list" id="timeRangeList">
			<!-- render tự động các time-range-list -->
        </ul>
    </div>
`;
timeRangeButton.idName = "modal-time-range";
timeRangeButton.className = "modal";


const customDateButton = new Button();
customDateButton.htmlContent = `
	<div class="modal-content">
	    <h2>Custom</h2>
	    <label>Starting date</label>
	    <input type="date" id="input-start-date" class="date-input">
	    <label>End date</label>
	    <input type="date" id="input-end-date" class="date-input">
	    <div class="modal-buttons">
	        <button class="btn-done">Hoàn tất</button>
	        <button class="btn-cancel" onclick="customDateButton.closeButton()">Hủy</button>
	    </div>
	</div>
`;
customDateButton.idName = "modal-custom-date";
customDateButton.className = "modal";


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
			year: year,
			month: month,
			day: day
		}
		const amountRange = {
			min: parseInt(amountRangeArr[0]),
			max: parseInt(amountRangeArr[1])
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
	const daySelect = document.getElementById("day");
	/*const searchbtn = document.getElementById("excuteSearch-button");*/


	monthSelect.addEventListener("change", function() {
		if (!yearSelect.value) {
			alert("Cần chọn năm trước khi chọn tháng");
		}
	})
	daySelect.addEventListener("change", function() {
		if (!yearSelect.value && !monthSelect.value) {
			alert("Cần chọn năm và tháng trước");
		}

	});
}

function nouiSliders() {
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
	slider.noUiSlider.on('update', function(values) {
		selectedRange.textContent = `${parseInt(values[0])} - ${parseInt(values[1])}`;
	});
}



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
			btnCategory.setAttribute('id', this.getAttribute('id'));
		});
	});
}

// xử lý sự kiện click của nút chọn của button customeDate
function handleCustomDateSubmit(){
	const submitButton = document.querySelector(".btn-done");
	    submitButton.addEventListener("click", function() {
	        const customModal = document.getElementById("modal-custom-date");
	        const openModalBtn = document.getElementById("btn-open-time-range");
	        const startDate = document.getElementById("input-start-date").value;
	        const endDate = document.getElementById("input-end-date").value;
	        if (startDate && endDate) {
				timeRangeButton.closeButton();
	            const rangeText = `${startDate} - ${endDate}`;
	            openModalBtn.querySelector("span").textContent = rangeText;
	            customModal.style.display = "none";
	        } else {
	            alert("Hãy chọn khoảng thời gian trước khi nhấn hoàn tất");
	        }
	    });
}

function renderTimeRanges() {
    const currentDate = new Date();
    const timeRangeList = document.getElementById("timeRangeList");

    if (!timeRangeList) return; // Kiểm tra nếu phần tử không tồn tại

    // Hàm định dạng ngày thành chuỗi dd/mm/yyyy
    function formatDate(date) {
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    }

    // Hàm lấy khoảng thời gian dựa trên loại
    function getTimeRange(type) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        let startDate, endDate;

        switch (type) {
            case "thisMonth":
                startDate = new Date(year, month, 1);
                endDate = new Date(year, month + 1, 0);
                break;
            case "lastMonth":
                startDate = new Date(year, month - 1, 1);
                endDate = new Date(year, month, 0);
                break;
            case "last3Months":
                startDate = new Date(year, month - 2, 1);
                endDate = new Date(year, month + 1, 0);
                break;
            case "thisYear":
                startDate = new Date(year, 0, 1);
                endDate = new Date(year, 11, 31);
                break;
            case "lastYear":
                startDate = new Date(year - 1, 0, 1);
                endDate = new Date(year - 1, 11, 31);
                break;
            default:
                return null;
        }
        return { startDate: formatDate(startDate), endDate: formatDate(endDate) };
    }

    // Danh sách các loại thời gian cần render
    const timeRanges = [
        { type: "thisMonth", label: "This month" },
        { type: "lastMonth", label: "Last month" },
        { type: "last3Months", label: "Last 3 months" },
        { type: "thisYear", label: "This year" },
        { type: "lastYear", label: "Last year" }
    ];

    // Tạo nội dung HTML từ danh sách khoảng thời gian
    let htmlContent = "";
    for (const range of timeRanges) {
        const { startDate, endDate } = getTimeRange(range.type);
        htmlContent += `<li class="time-range-item" id="${startDate} - ${endDate}">
            ${range.label}<br><small>${startDate} - ${endDate}</small></li>`;
    }

    // Gắn nội dung vào danh sách và giữ mục "Custom" ở cuối
    timeRangeList.innerHTML = htmlContent + `<li class="time-range-item" onclick="customDateButton.openButton()">Custom</li>`;
}

timeRangeButton.openButton = function(){
	this.isOpen = true;
	const modal = document.createElement("div");
	modal.setAttribute("id", this.idName);
	modal.setAttribute("class", this.className);
	modal.innerHTML = this.htmlContent;
	document.querySelector('nav').appendChild(modal);
	renderTimeRanges();
}

customDateButton.openButton = function(){
	this.isOpen = true;
	const modal = document.createElement("div");
	modal.setAttribute("id", this.idName);
	modal.setAttribute("class", this.className);
	modal.innerHTML = this.htmlContent;
	document.querySelector('nav').appendChild(modal);
	handleCustomDateSubmit();
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

// overide lại phương thức để thực thi 2 hàm riêng của searchButton
searchButton.openButton = function() {
	this.isOpen = true;
	const modal = document.createElement("div");
	modal.setAttribute("id", this.idName);
	modal.innerHTML = this.htmlContent;
	document.querySelector('nav').appendChild(modal);
	getDataForSearch();
	nouiSliders();
};




// đưa 2 object này thành global vì sử dụng type = module
window.searchButton = searchButton;
window.selectSearchCategoryButton = selectSearchCategoryButton;
window.timeRangeButton = timeRangeButton;
window.customDateButton = customDateButton;