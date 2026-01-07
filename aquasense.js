let records = [];
let totalUsed = 0;
let dailyTarget = 0;

const usageType = document.getElementById("usageType");
const waterAmount = document.getElementById("waterAmount");
const usageDate = document.getElementById("usageDate");
const addUsageBtn = document.getElementById("addUsageBtn");

const waterTarget = document.getElementById("waterTarget");
const saveTargetBtn = document.getElementById("saveTargetBtn");

const totalUsage = document.getElementById("totalUsage");
const dailyTargetText = document.getElementById("dailyTarget");
const remainingWater = document.getElementById("remainingWater");
const targetInfo = document.getElementById("targetInfo");

const usageTableBody = document.getElementById("usageTableBody");
const filterType = document.getElementById("filterType");

/* Add usage */
addUsageBtn.addEventListener("click", () => {
    const type = usageType.value;
    const amount = Number(waterAmount.value);
    const date = usageDate.value;

    if (!amount || !date) {
        alert("Please enter all details");
        return;
    }

    records.push({ type, amount, date });
    totalUsed += amount;

    updateUI();
    waterAmount.value = "";
    usageDate.value = "";
});

/* Save target */
saveTargetBtn.addEventListener("click", () => {
    dailyTarget = Number(waterTarget.value);

    if (dailyTarget <= 0) {
        alert("Enter valid target");
        return;
    }

    updateUI();
});

/* Update dashboard + table */
function updateUI() {
    totalUsage.textContent = totalUsed + " L";
    dailyTargetText.textContent = dailyTarget + " L";

    let remaining = dailyTarget - totalUsed;
    remainingWater.textContent = remaining + " L";

    targetInfo.innerHTML =
        "Target: <b>" + dailyTarget + " L</b> | Remaining: <b>" + remaining + " L</b>";

    renderTable();

    if (dailyTarget > 0 && totalUsed > dailyTarget) {
        alert("Water usage exceeded daily target!");
    }
}

/* Render table */
function renderTable() {
    usageTableBody.innerHTML = "";

    records.forEach((rec, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${rec.type}</td>
            <td>${rec.amount}</td>
            <td>${rec.date}</td>
            <td><button onclick="deleteRecord(${index})">Delete</button></td>
        `;

        usageTableBody.appendChild(row);
    });
}

/* Delete record */
function deleteRecord(index) {
    totalUsed -= records[index].amount;
    records.splice(index, 1);
    updateUI();
}

/* Filter records */
filterType.addEventListener("change", () => {
    const filter = filterType.value;
    const rows = usageTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        row.style.display =
            filter === "All" || row.children[0].textContent === filter
                ? ""
                : "none";
    });
});
