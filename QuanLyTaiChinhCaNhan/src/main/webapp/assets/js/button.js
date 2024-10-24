// lớp Button tạo nút
import { fetchCategories } from "./api/CategoryApi.js";
import { pushData } from "./api/SearchApi.js";



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
		document.querySelector('nav').appendChild(modal);
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
	    <button id="choose-category-btn-left" onclick="selectSearchCategoryButton.openButton()">
	      <span>CHỌN THỂ LOẠI</span>
	      <i class="fa-regular fa-greater-than"></i>
	    </button>
	    

	
	<div class="category-wrapper-right">
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

// hàm lấy ngày được chọn

const addTransaction = new Button();
addTransaction.htmlContent = `
			<div>
            <h3>Thêm giao dịch</h3>

            <label for="TypeOfTransaction">Ví</label>
            <select id="TypeOfTransaction" >
				<option  selected>Loại</option>
                <option value="expense" >Chi tiêu</option>
				<option value="income">Thu nhập</option>
            </select>
			
			

            <label for="Category">Nhóm</label>
            <select id="Category">
                <option selected>Chọn nhóm</option>
				
				
            </select>

            <label for="amount">Số tiền</label>
            <input type="number" id="amount" value="0">

            <label for="date">Ngày</label>
            <input type="date" id="date" value="2019-06-11">

            <label for="ghi-chu">Ghi chú</label>
            <input type="text" id="ghi-chu" placeholder="Ghi chú">

            <div class="transaction-btn-container">
                <button class="save-btn" disabled>Lưu</button>
                <button class="cancel-btn" onclick="addTransaction.closeButton()">Hủy</button>
            </div>
        </div>`;
addTransaction.idName = "transactionForm";


document.addEventListener('DOMContentLoaded', function () {
	const categories = {
	            expense: ["Ăn uống", "Di chuyển", "Giải trí", "Hóa đơn"],
	            income: ["Lương", "Tiền thưởng", "Đầu tư", "Khác"]
	        };

	    // Lắng nghe sự thay đổi của dropdown TypeOfTransaction
		addTransaction.openButton = function() {
		    this.isOpen = true;
		    const modal = document.createElement("div");
		    modal.setAttribute("id", this.idName);
		    modal.innerHTML = this.htmlContent;
		    document.body.appendChild(modal);
	
		    // Gắn sự kiện sau khi phần tử đã được tạo
		    const typeOfTransaction = document.getElementById("TypeOfTransaction");
		    if (typeOfTransaction) {
		        typeOfTransaction.addEventListener("change", function() {
		            const selectedType = this.value;
		            const categorySelect = document.getElementById("Category");

		            // Xóa tất cả các tùy chọn hiện tại trong danh sách nhóm
		            categorySelect.innerHTML = '<option selected>Chọn nhóm</option>';

		            // Nếu người dùng chọn một loại giao dịch hợp lệ (expense hoặc income)
		            if (categories[selectedType]) {
		                categories[selectedType].forEach(function(category) {
		                    const option = document.createElement("option");
		                    option.value = category;
		                    option.textContent = category;
		                    categorySelect.appendChild(option);
		                });
		            }
		        });
		    } else {
		        console.error("Element with ID 'TypeOfTransaction' not found!");
		    }
		};
	
		});

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



// hàm xử lý thể loại được lấy từ database tạo ra các thẻ li tương ứng
async function getCategories() {
	try {
		const categories = await fetchCategories();
		console.log(categories);
		return categories;
	} catch (error) {
		console.error("Failed to fetch categories:", error);
	}
}
// Hàm format số tiền
function formatCurrency(amount) {
	return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
}
// hàm tạo ra dánh sách thể loại
// async và await là để chờ hàm có await thực hiện xong thì nó mới bắt đầu thực hiện để đồng bộ dữ liệu
async function renderCategory() {

	
		const categories = await getCategories();
		const expenseList = document.querySelector('.expense-list');
		const incomeList = document.querySelector('.income-list');
		console.log(expenseList);
		console.log(incomeList);
		let expenseContent = '';
		let incomeContent = '';
		if (Array.isArray(categories)) {
			categories.forEach((category) => {
				if (category.type === 'Expense') {
					expenseContent += `<div class="category" id="${category.categoryID}"}>
						<img src="image/${category.urlimage}" alt="${category.categoryName}" loading="lazy">
					    <span>${category.categoryName}</span>
					</div>`
				} else {
					incomeContent += `<div class="category" id="${category.categoryID}"}>
											<img src="image/${category.urlimage}" alt="${category.categoryName}" loading="lazy">
										    <span>${category.categoryName}</span>
										</div>`
				}
			});
			expenseList.innerHTML += expenseContent;
			incomeList.innerHTML += incomeContent;
			handleCategoryClick();
	}
}

// hàm lấy dữ liệu(thể loại, ngày, số tiền) để tìm kiếm giao dịch người dùng chọn và đẩy dữ liệu lên server xử lý
function getDataForSearch() {
	const inputDate = document.getElementById("inputDateSearch");
	const categoryID = document.querySelector(".category-item.select");
	const amount = document.getElementById("amountSearch");
	let selectedDate = null;
	let selectedCategoryID = null;
	let selectedAmount = null;
	if (inputDate) {
		inputDate.addEventListener("change", (event) => {
			selectedDate = event.target.value; // Lấy giá trị ngày đã chọn
			console.log(selectedDate);
			pushData(selectedCategoryID, selectedDate, selectedAmount);
		});
	}
	if (amount) {
		amount.addEventListener("change", (event) => {
			selectedAmount = event.target.value;
			console.log(selectedAmount);
			pushData(selectedCategoryID, selectedDate, selectedAmount);
		})
	}

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



function handleCategoryClick() {
	const categories = document.querySelectorAll(".category");

	categories.forEach((category) => {
		category.addEventListener("click", function() {
			// Remove the selected class and checkmark from all categories
			categories.forEach((cat) => {
				cat.classList.remove("selected");
				const checkmark = cat.querySelector(".checkmark");
				if (checkmark) {
					cat.removeChild(checkmark);
				}
			});

			// Add the selected class to the clicked category
			this.classList.add("selected");
			const span = document.createElement("span");
			span.className = "checkmark";
			span.textContent = "✔";
			this.appendChild(span);

			// Print the selected category's name to the console
			const selectedCategoryName = this.querySelector("span").innerText;
			console.log("Selected Category:", selectedCategoryName);
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
window.addTransaction = addTransaction;
window.searchButton = searchButton;
window.selectSearchCategoryButton = selectSearchCategoryButton;
