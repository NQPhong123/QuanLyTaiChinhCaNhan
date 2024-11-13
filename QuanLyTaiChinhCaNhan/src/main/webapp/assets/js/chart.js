const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
    type: 'doughnut',
    data: {
        labels: ['Lương', 'Chứng khoán'],
        datasets: [{
            data: [0, 0], // Dữ liệu sẽ được cập nhật động từ server
            backgroundColor: ['#36a2eb', '#ff6384'],
            hoverOffset: 4
        }]
    }
});

const expenseCtx = document.getElementById('expenseChart').getContext('2d');
const expenseChart = new Chart(expenseCtx, {
    type: 'doughnut',
    data: {
        labels: ['Mua sắm', 'Dịch vụ'],
        datasets: [{
            data: [0, 0], // Dữ liệu sẽ được cập nhật động từ server
            backgroundColor: ['#ff9f40', '#ffcd56'],
            hoverOffset: 4
        }]
    }
});
