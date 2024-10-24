const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
	type: 'doughnut',
	data: {
		labels: ['Lương', 'Chứng khoán'],
		datasets: [{
			data: [6000000, 1200000], // Dữ liệu sẽ được cập nhật động
			backgroundColor: ['#36a2eb', '#ff6384'],
			hoverOffset: 4
		}]
	}
});

const expenseCtx = document.getElementById('expenseChart').getContext('2d');
const expenseChart = new Chart(expenseCtx, {
	type: 'doughnut',
	data: {
		labels: ['Tiền chơi xe', 'Tiền cho gái'],
		datasets: [{
			data: [100000, 200000], // Dữ liệu sẽ được cập nhật động
			backgroundColor: ['#36a2eb', '#ff6384'],
			hoverOffset: 4
		}]
	}
});
