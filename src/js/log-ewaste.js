document.addEventListener("DOMContentLoaded", function () {
    console.log("Log eWaste Page Loaded!");

    const logEwasteForm = document.getElementById("log-ewaste-form");

    // Log eWaste Form Submission
    logEwasteForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const wasteType = document.getElementById("waste-type").value;
        const quantity = document.getElementById("quantity").value;
        const origin = document.getElementById("origin").value;
        const deadline = document.getElementById("deadline").value;

        // Simulate logging eWaste (replace with blockchain integration)
        console.log("Logged eWaste:", { wasteType, quantity, origin, deadline });
        alert("eWaste logged successfully!");
        logEwasteForm.reset();
    });
});