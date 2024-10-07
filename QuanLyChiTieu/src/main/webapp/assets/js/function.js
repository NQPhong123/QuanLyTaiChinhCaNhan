function showTransactionForm() {
    // Create a new div for the modal
    const modal = document.createElement("div");
    modal.setAttribute("id", "transactionModal");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.zIndex = "1000"; // Ensures it's on top
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";

    // Create the form HTML inside the modal
    modal.innerHTML = `
        <div style="width: 400px; background-color: white; padding: 20px; border-radius: 10px;">
            <h3 style="text-align: center;">Thêm giao dịch</h3>

            <div style="margin-bottom: 10px;">
                <label for="vi" style="display: block; margin-bottom: 5px;">Ví</label>
                <select id="vi" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
                    <option>Tiền mặt</option>
                </select>
            </div>

            <div style="margin-bottom: 10px;">
                <label for="nhom" style="display: block; margin-bottom: 5px;">Nhóm</label>
                <select id="nhom" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
                    <option>Chọn nhóm</option>
                </select>
            </div>

            <div style="margin-bottom: 10px;">
                <label for="so-tien" style="display: block; margin-bottom: 5px;">Số tiền</label>
                <input type="number" id="so-tien" value="0" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
            </div>

            <div style="margin-bottom: 10px;">
                <label for="ngay" style="display: block; margin-bottom: 5px;">Ngày</label>
                <input type="date" id="ngay" value="2019-06-11" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
            </div>

            <div style="margin-bottom: 10px;">
                <label for="ghi-chu" style="display: block; margin-bottom: 5px;">Ghi chú</label>
                <input type="text" id="ghi-chu" placeholder="Ghi chú" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
            </div>

            <div style="text-align: right;">
                <button style="padding: 8px 16px; background-color: #ccc; border: none; border-radius: 5px; cursor: not-allowed;">Lưu</button>
                <button style="padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;" onclick="closeModal()">Hủy</button>
            </div>
        </div>
    `;

    // Append the modal to the body
    document.body.appendChild(modal);
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("transactionModal");
    if (modal) {
        modal.remove();
    }
}

