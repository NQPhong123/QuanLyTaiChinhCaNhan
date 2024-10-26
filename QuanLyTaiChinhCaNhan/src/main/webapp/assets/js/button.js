// lớp Button tạo nút
export default class Button {
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




// Hàm format số tiền
function formatCurrency(amount) {
	return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
}


