const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
    type: 'doughnut',
    data: {
        labels: [], // Nhãn sẽ được cập nhật động từ server
        datasets: [{
            data: [], // Dữ liệu sẽ được cập nhật động từ server
            backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0', '#9966ff', '#ff9f40'],
            hoverOffset: 4
        }]
    }
});

// Khởi tạo biểu đồ chi tiêu (Expense)
const expenseCtx = document.getElementById('expenseChart').getContext('2d');
const expenseChart = new Chart(expenseCtx, {
    type: 'doughnut',
    data: {
        labels: [], // Nhãn sẽ được cập nhật động từ server
        datasets: [{
            data: [], // Dữ liệu sẽ được cập nhật động từ server
            backgroundColor: ['#ff9f40', '#ffcd56', '#36a2eb', '#9966ff', '#4bc0c0'],
            hoverOffset: 4
        }]
    }
});