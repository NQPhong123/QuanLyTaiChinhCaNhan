import { fetchCategories } from "./api/CategoryApi.js";


export async function getCategories() {
    try {
        const categories = await fetchCategories();
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
}


export async function taiCategory() {
    const categories = await getCategories();
    const expenseList = document.querySelector('.danhsachexpense');
    const incomeList = document.querySelector('.danhsachincome');
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



export function xuliTransactionTypeChange() {
    const transactionType = document.getElementById("Loaidaodich");
    const expenseList = document.querySelector('.danhsachexpense');
    const incomeList = document.querySelector('.danhsachincome');

    transactionType.addEventListener("change", () => {
        if (transactionType.value === "chonexpense") {
            expenseList.classList.remove("hidden");
            incomeList.classList.add("hidden");
        } else if (transactionType.value === "chonincome") {
            incomeList.classList.remove("hidden");
            expenseList.classList.add("hidden");
        }
    });
}




btnEdit.btnedit = function() {
    this.isOpen = true;
    const modal = document.createElement("div");
    modal.setAttribute("id", this.idName);
    modal.innerHTML = this.htmlContent;
    document.body.appendChild(modal);
    
    taiCategory();
    xuliTransactionTypeChange();

   
};

window.btnEdit = btnEdit;
