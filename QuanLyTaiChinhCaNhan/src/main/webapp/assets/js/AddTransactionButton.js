import Button from "./button.js";
import { fetchCategories } from "./api/CategoryApi.js";
import { pushDataForSaveTran } from "./api/AddTransactionApi.js";

const addTransaction = new Button();
addTransaction.htmlContent = `
    <div>
        <h3>Thêm giao dịch</h3>
        <label for="TypeOfTransaction">Ví</label>
        <select id="TypeOfTransaction" required>
            <option value="" disabled selected>Chọn loại giao dịch</option>
            <option value="expense">Chi tiêu</option>
            <option value="income">Thu nhập</option>
        </select>
        <div class="error-message" id="typeError"></div>

        <label>Nhóm</label>
        <select class="expense-list" id="expenseCategory" required>
            <option value="" selected>Chọn nhóm</option>
        </select>
        <select class="income-list hidden" id="incomeCategory" required>
            <option value="" selected>Chọn nhóm</option>
        </select>
        <div class="error-message" id="categoryError"></div>

        <label for="amount">Số tiền</label>
        <input type="number" id="amount" required value="0">
        <div class="error-message" id="amountError"></div>
        
        <label for="date">Ngày</label>
        <input type="date" id="date" required>
        <div class="error-message" id="dateError"></div>
        
        <label for="ghi-chu">Ghi chú</label>
        <input type="text" id="ghi-chu" required placeholder="Ghi chú">
        <div class="error-message" id="noteError"></div>

        <div class="transaction-btn-container">
            <button class="save-btn">Lưu</button>
            <button class="cancel-btn" onclick="addTransaction.closeButton()">Hủy</button>
        </div>
    </div>`;
addTransaction.idName = "transactionForm";

async function getCategories() {
    try {
        const categories = await fetchCategories();
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
}

async function renderCategory() {
    const categories = await getCategories();
    const expenseList = document.querySelector('.expense-list');
    const incomeList = document.querySelector('.income-list');
    let expenseContent = '<option value="" selected>Chọn nhóm</option>';
    let incomeContent = '<option value="" selected>Chọn nhóm</option>';

    if (Array.isArray(categories)) {
        categories.forEach((category) => {
            if (category.type === 'Expense') {
                expenseContent += `
                    <option value="${category.categoryID}">
                        ${category.categoryName}
                    </option>`;
            } else if (category.type === 'Income') {
                incomeContent += `
                    <option value="${category.categoryID}">
                        ${category.categoryName}
                    </option>`;
            }
        });
        expenseList.innerHTML = expenseContent;
        incomeList.innerHTML = incomeContent;
    }
}

function handleTransactionTypeChange() {
    const transactionType = document.getElementById("TypeOfTransaction");
    const expenseList = document.querySelector('.expense-list');
    const incomeList = document.querySelector('.income-list');

    transactionType.addEventListener("change", () => {
        if (transactionType.value === "expense") {
            expenseList.classList.remove("hidden");
            incomeList.classList.add("hidden");
        } else if (transactionType.value === "income") {
            incomeList.classList.remove("hidden");
            expenseList.classList.add("hidden");
        }
    });
}

function validateForm() {
    let isValid = true;

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = "block"; // Hiển thị thông báo lỗi
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
            error.style.display = "none"; // Ẩn thông báo lỗi
        });
    }

    clearErrors();

    const transactionType = document.getElementById("TypeOfTransaction").value;
    if (!transactionType) {
        showError("typeError", "Vui lòng chọn loại giao dịch.");
        isValid = false;
    }

    const categoryID = transactionType === "expense" ? 
        document.getElementById("expenseCategory").value : 
        document.getElementById("incomeCategory").value;
    if (!categoryID) {
        showError("categoryError", "Vui lòng chọn nhóm.");
        isValid = false;
    }

    const amount = document.getElementById("amount").value;
    if (!amount || amount <= 0) {
        showError("amountError", "Vui lòng nhập số tiền hợp lệ.");
        isValid = false;
    }

    const date = document.getElementById("date").value;
    if (!date) {
        showError("dateError", "Vui lòng chọn ngày.");
        isValid = false;
    }

    const note = document.getElementById("ghi-chu").value.trim();
    if (!note) {
        showError("noteError", "Vui lòng nhập ghi chú.");
        isValid = false;
    }

    return isValid;
}


function saveTransaction() {
    if (!validateForm()) return;

    const transactionType = document.getElementById("TypeOfTransaction").value;
    const categoryID = transactionType === "expense" ? 
        document.getElementById("expenseCategory").value : 
        document.getElementById("incomeCategory").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const decription = document.getElementById("ghi-chu").value;
    
    pushDataForSaveTran(transactionType, categoryID, amount, date, decription);
	addTransaction.closeButton();
	window.location.reload(true);
}

addTransaction.openButton = function() {
    this.isOpen = true;
    const modal = document.createElement("div");
    modal.setAttribute("id", this.idName);
    modal.innerHTML = this.htmlContent;
    document.body.appendChild(modal);
    
    renderCategory();
    handleTransactionTypeChange();

    document.querySelector(".save-btn").addEventListener("click", saveTransaction);
};

window.addTransaction = addTransaction;
