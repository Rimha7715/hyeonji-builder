
const ctx = document.getElementById('asset-chart').getContext('2d');

const years = Array.from({ length: 11 }, (_, i) => 2014 + i);

// More realistic sample data for demonstration
const sp500Data = [100, 112, 120, 142, 138, 180, 210, 250, 230, 280, 320];
const goldData = [100, 95, 110, 115, 120, 145, 180, 175, 160, 185, 195];
const bitcoinData = [100, 250, 1500, 12000, 4000, 8000, 30000, 50000, 20000, 65000, 45000];


// Get CSS variables
const style = getComputedStyle(document.body);
const textColor = style.getPropertyValue('--text-color');
const gridColor = style.getPropertyValue('--grid-color');
const bitcoinColor = style.getPropertyValue('--bitcoin-color');
const goldColor = style.getPropertyValue('--gold-color');
const sp500Color = style.getPropertyValue('--sp500-color');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: [
            {
                label: 'S&P 500',
                data: sp500Data,
                borderColor: sp500Color,
                backgroundColor: 'rgba(66, 165, 245, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Gold',
                data: goldData,
                borderColor: goldColor,
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Bitcoin',
                data: bitcoinData,
                borderColor: bitcoinColor,
                backgroundColor: 'rgba(247, 147, 26, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Asset Growth Over 10 Years (Indexed to 100)',
                color: textColor,
                font: {
                    size: 18,
                    family: 'Poppins', 
                    weight: '600'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#2c2c2c',
                titleFont: {
                    family: 'Poppins', 
                    weight: 'bold'
                },
                bodyFont: {
                    family: 'Poppins'
                }
            },
            legend: {
                position: 'bottom',
                labels: {
                    color: textColor,
                    font: {
                        family: 'Poppins'
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                    color: textColor,
                    font: {
                        family: 'Poppins'
                    }
                },
                ticks: {
                    color: textColor
                },
                grid: {
                    color: gridColor
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value (Indexed)',
                    color: textColor,
                     font: {
                        family: 'Poppins'
                    }
                },
                ticks: {
                    color: textColor
                },
                grid: {
                    color: gridColor
                }
            }
        }
    }
});
