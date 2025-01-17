// Show loading message
document.body.innerHTML += '<div id="loading">Loading data...</div>';

const defaultData = {
    labels: ['Temperature', 'Humidity', 'Precipitation'],
    datasets: [{
        label: 'Default Data',
        data: [25, 50, 75], // Default sample data
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
    }]
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: defaultData, // Use default data initially
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    max: 100, // Adjust max value to fit the data
                    stepSize: 10 // Adjust step size for better readability
                }
            }
        },
        responsive: true,
        maintainAspectRatio: true // Make the chart static by maintaining aspect ratio
    }
});

const token = 'BculWFKzyjRnIbooeqsskehbTQcLFZnx';
const apiUrl = 'https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&startdate=2024-05-05&enddate=2025-01-15';

async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'token': token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Process and extract real-time data
        const temperature = data.results[0].value; // Example processing
        const humidity = data.results[1].value; // Example processing
        const precipitation = data.results[2].value; // Example processing

        // Update chart with real-time data
        myChart.data.datasets[0].data = [temperature, humidity, precipitation];
        myChart.data.datasets[0].label = 'Real-Time Data';
        myChart.update();

        // Remove loading message
        document.getElementById('loading').remove();
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('loading').innerText = 'Error loading data';
    }
}

// Call fetchData to get the data
fetchData();

