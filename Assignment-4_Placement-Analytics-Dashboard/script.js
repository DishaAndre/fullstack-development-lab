let data = [];
let subjectChart;
let distributionChart;

Papa.parse("StudentsPerformance.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {

        data = results.data.map(row => ({
            gender: row.gender?.trim(),
            lunch: row.lunch?.trim(),
            prep: row["test preparation course"]?.trim(),
            math: parseInt(row["math score"]),
            reading: parseInt(row["reading score"]),
            writing: parseInt(row["writing score"])
        })).filter(d => !isNaN(d.math));

        initializeCharts();
        updateDashboard();
    }
});

function getFilteredData() {
    const gender = document.getElementById("genderFilter").value;
    const lunch = document.getElementById("lunchFilter").value;
    const prep = document.getElementById("prepFilter").value;

    return data.filter(d =>
        (gender === "all" || d.gender === gender) &&
        (lunch === "all" || d.lunch === lunch) &&
        (prep === "all" || d.prep === prep)
    );
}

function updateDashboard() {

    const filtered = getFilteredData();

    document.getElementById("totalStudents").innerText = filtered.length;

    document.getElementById("avgMath").innerText =
        calculateAverage(filtered.map(d => d.math));

    document.getElementById("avgReading").innerText =
        calculateAverage(filtered.map(d => d.reading));

    document.getElementById("avgWriting").innerText =
        calculateAverage(filtered.map(d => d.writing));

    updateCharts(filtered);
}

function initializeCharts() {

    subjectChart = new Chart(
        document.getElementById("subjectChart"),
        {
            type: "bar",
            data: {
                labels: ["Math", "Reading", "Writing"],
                datasets: [{
                    label: "Average Score",
                    data: [0, 0, 0],
                    backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"]
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 800
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        }
    );

    distributionChart = new Chart(
        document.getElementById("distributionChart"),
        {
            type: "bar",
            data: {
                labels: [
                    "0-10","10-20","20-30","30-40","40-50",
                    "50-60","60-70","70-80","80-90","90-100"
                ],
                datasets: [{
                    label: "Score Distribution",
                    data: Array(10).fill(0),
                    backgroundColor: "#673ab7"
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}

function updateCharts(dataset) {

    if (dataset.length === 0) return;

    const avgMath = calculateAverage(dataset.map(d => d.math));
    const avgReading = calculateAverage(dataset.map(d => d.reading));
    const avgWriting = calculateAverage(dataset.map(d => d.writing));

    subjectChart.data.datasets[0].data = [
        avgMath,
        avgReading,
        avgWriting
    ];
    subjectChart.update();

    const ranges = Array(10).fill(0);

    dataset.forEach(d => {
        const avg = (d.math + d.reading + d.writing) / 3;
        const index = Math.min(Math.floor(avg / 10), 9);
        ranges[index]++;
    });

    distributionChart.data.datasets[0].data = ranges;
    distributionChart.update();
}

function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
}

document.querySelectorAll("select")
    .forEach(select => select.addEventListener("change", updateDashboard));
