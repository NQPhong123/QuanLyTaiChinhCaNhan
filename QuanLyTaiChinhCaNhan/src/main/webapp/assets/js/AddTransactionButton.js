import Button from "./button.js";
import { fetchCategories } from "./api/CategoryApi.js";

const addTransaction = new Button();
addTransaction.htmlContent = `
    <div>
        <h3>Thêm giao dịch</h3>
        <label for="TypeOfTransaction">Ví</label>
        <select id="TypeOfTransaction">
            <option value="expense">Chi tiêu</option>
            <option value="income">Thu nhập</option>
        </select>

        <label >Nhóm </label>
        <select class="expense-list" id="expenseCategory">
            <option selected>Chọn nhóm</option>
        </select>
        <select class="income-list hidden" id="incomeCategory">
            <option selected>Chọn nhóm</option>
        </select>

        <label for="amount">Số tiền</label>
        <input type="number" id="amount" value="0">
        
        <label for="date">Ngày</label>
        <input type="date" id="date" >
        
        <label for="ghi-chu">Ghi chú</label>
        <input type="text" id="ghi-chu" placeholder="Ghi chú">

        <div class="transaction-btn-container">
            <button class="save-btn" disabled>Lưu</button>
            <button class="cancel-btn" onclick="addTransaction.closeButton()">Hủy</button>
        </div>
    </div>`;
addTransaction.idName = "transactionForm";

async function getCategories() {
    try {
        const categories = await fetchCategories();
        console.log(categories);
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
}

async function renderCategory() {
    const categories = await getCategories();
    const expenseList = document.querySelector('.expense-list');
    const incomeList = document.querySelector('.income-list');
    let expenseContent = '<option selected>Chọn nhóm</option>';
    let incomeContent = '<option selected>Chọn nhóm</option>';

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

// Hàm để xử lý sự kiện khi thay đổi loại giao dịch
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

addTransaction.openButton = function() {
    this.isOpen = true;
    const modal = document.createElement("div");
    modal.setAttribute("id", this.idName);
    modal.innerHTML = this.htmlContent;
    document.body.appendChild(modal);
    renderCategory(); // Tải danh mục
    handleTransactionTypeChange(); // Thay đổi loại giao dịch
};

window.addTransaction = addTransaction;
