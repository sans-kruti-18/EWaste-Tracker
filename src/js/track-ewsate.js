document.addEventListener("DOMContentLoaded", function () {
    console.log("Track eWaste Page Loaded!");

    const trackEwasteTable = document.getElementById("track-ewaste-table").getElementsByTagName("tbody")[0];
    const statusFilter = document.getElementById("status-filter");

    // Simulate fetching tracked eWaste items
    const trackedItems = [
        { id: 1, wasteType: "Laptop", status: "Pending" },
        { id: 2, wasteType: "Smartphone", status: "In Transit" },
        { id: 3, wasteType: "Monitor", status: "Recycled" },
        { id: 4, wasteType: "Printer", status: "Pending" },
        { id: 5, wasteType: "Tablet", status: "In Transit" },
    ];

    // Function to render eWaste items in the table based on filter
    function renderTrackedItems(filter = "all") {
        const filteredItems = filter === "all"
            ? trackedItems
            : trackedItems.filter((item) => item.status.toLowerCase().replace(" ", "-") === filter);

        // Clear the table
        trackEwasteTable.innerHTML = "";

        if (filteredItems.length > 0) {
            filteredItems.forEach((item) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.wasteType}</td>
                    <td><span class="status ${item.status.toLowerCase().replace(" ", "-")}">${item.status}</span></td>
                    <td>
                        <button class="action-btn view-details" data-id="${item.id}">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </td>
                `;
                trackEwasteTable.appendChild(row);
            });
        } else {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="3">No eWaste items found for the selected filter.</td>`;
            trackEwasteTable.appendChild(row);
        }
    }

    // Initial render
    renderTrackedItems();

    // Add event listener for filter change
    statusFilter.addEventListener("change", function () {
        const selectedStatus = statusFilter.value;
        renderTrackedItems(selectedStatus);
    });

    // Add event listener for view details button
    trackEwasteTable.addEventListener("click", function (e) {
        if (e.target.closest(".view-details")) {
            const itemId = e.target.closest(".view-details").getAttribute("data-id");
            alert(`View details for item ID: ${itemId}`);
        }
    });
});