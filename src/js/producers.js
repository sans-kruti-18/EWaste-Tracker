document.addEventListener("DOMContentLoaded", function () {
    console.log("Producer Dashboard Loaded!");

    // Logout button functionality
    const logoutBtn = document.querySelector(".logout-btn");
    logoutBtn.addEventListener("click", function () {
        // Redirect to index.html
        window.location.href = "index.html";
    });

    // Fetch and display statistics (if needed)
    fetchDashboardStatistics();
});

// Simulate fetching dashboard statistics
function fetchDashboardStatistics() {
    // Replace this with actual data fetching logic (e.g., from a blockchain or backend API)
    const statistics = {
        totalDisposal: 120,
        totalLogged: 80,
        totalPending: 30,
        totalRecycled: 50,
        totalInTransit: 20,
    };

    // Update the DOM with the fetched statistics
    document.getElementById("total-disposal").textContent = statistics.totalDisposal;
    document.getElementById("total-logged").textContent = statistics.totalLogged;
    document.getElementById("total-pending").textContent = statistics.totalPending;
    document.getElementById("total-recycled").textContent = statistics.totalRecycled;
    document.getElementById("total-in-transit").textContent = statistics.totalInTransit;
}