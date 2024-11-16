// Hàm cập nhật biểu đồ thu nhập
function updateRevenueChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.update();
}

// Hàm cập nhật biểu đồ chi tiêu
function updateExpenseChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.update();
}

// Hàm xử lý dữ liệu từ server và cập nhật biểu đồ
function processChartData(responseData) {
    // Phân tích dữ liệu thu nhập
    const incomeData = {
        labels: responseData.incomes.map(income => income.category),
        values: responseData.incomes.map(income => income.amount),
        descriptions: responseData.incomes.map(income => income.description || "Không có mô tả") // Sử dụng description, nếu không có thì giá trị mặc định
    };

    // Phân tích dữ liệu chi tiêu
    const expenseData = {
        labels: responseData.expenses.map(expense => expense.category),
        values: responseData.expenses.map(expense => expense.amount),
        descriptions: responseData.expenses.map(expense => expense.description || "Không có mô tả") // Sử dụng description, nếu không có thì giá trị mặc định
    };

    // Cập nhật các biểu đồ
    updateRevenueChart(revenueChart, incomeData);
    updateExpenseChart(expenseChart, expenseData);

    // Cập nhật số liệu trên giao diện
    document.getElementById('incomeAmount').textContent = `+${incomeData.values.reduce((a, b) => a + b, 0).toLocaleString()} đ`;
    document.getElementById('outcomeAmount').textContent = `-${expenseData.values.reduce((a, b) => a + b, 0).toLocaleString()} đ`;

    // Cập nhật danh sách mô tả
    document.getElementById('incomeDescriptions').innerHTML = incomeData.descriptions
        .map((desc, idx) => `<p>${incomeData.labels[idx]}: ${desc}</p>`)
        .join('');

    document.getElementById('expenseDescriptions').innerHTML = expenseData.descriptions
        .map((desc, idx) => `<p>${expenseData.labels[idx]}: ${desc}</p>`)
        .join('');
}

// Hàm lấy dữ liệu từ server
function fetchChartData(selectedMonth) {
    fetch('ChartServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ month: selectedMonth })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Dữ liệu nhận từ server:", data); // In dữ liệu ra console để kiểm tra
        if (data.status === "success") {
            processChartData(data);
        } else {
            console.error("Error fetching chart data:", data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// Sử dụng khi người dùng chọn tab khác
function showTabAndFetchData(tab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));

    let selectedMonth;
    if (tab === 'last') {
        tabs[0].classList.add('active');
        selectedMonth = lastMonth;
    } else if (tab === 'current') {
        tabs[1].classList.add('active');
        selectedMonth = currentMonth;
    } else {
        tabs[2].classList.add('active');
        selectedMonth = nextMonth;
    }

    fetchChartData(selectedMonth);
}

// Tự động tải dữ liệu tháng hiện tại khi trang được tải
window.addEventListener('load', () => {
    fetchChartData(currentMonth);
});
