import Button from "./button.js";

const addTransaction = new Button();
addTransaction.htmlContent = `
			<div>
            <h3>Thêm giao dịch</h3>

            <label for="TypeOfTransaction">Ví</label>
            <select id="TypeOfTransaction" >
                <option value="expense">Chi tiêu</option>
				<option value="income">Thu nhập</option>
            </select>

            <label for="Category">Nhóm</label>
            <select id="Category">
                <option>Chọn nhóm</option>
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
window.addTransaction = addTransaction;