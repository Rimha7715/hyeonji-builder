const ctx = document.getElementById('asset-chart').getContext('2d');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const years = Array.from({ length: 11 }, (_, i) => 2014 + i);

const sp500Data = [100, 112, 120, 142, 138, 180, 210, 250, 230, 280, 320];
const goldData = [100, 95, 110, 115, 120, 145, 180, 175, 160, 185, 195];
const bitcoinData = [100, 250, 1500, 12000, 4000, 8000, 30000, 50000, 20000, 65000, 45000];

function getThemeColors() {
    const style = getComputedStyle(document.body);
    return {
        textColor: style.getPropertyValue('--text-color').trim(),
        gridColor: style.getPropertyValue('--grid-color').trim(),
        bitcoinColor: style.getPropertyValue('--bitcoin-color').trim(),
        goldColor: style.getPropertyValue('--gold-color').trim(),
        sp500Color: style.getPropertyValue('--sp500-color').trim()
    };
}

let colors = getThemeColors();

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: [
            {
                label: 'S&P 500',
                data: sp500Data,
                borderColor: colors.sp500Color,
                backgroundColor: 'rgba(66, 165, 245, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Gold',
                data: goldData,
                borderColor: colors.goldColor,
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Bitcoin',
                data: bitcoinData,
                borderColor: colors.bitcoinColor,
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
                text: 'Asset Growth Comparison (Logarithmic Scale)',
                color: colors.textColor,
                font: {
                    size: 18,
                    family: 'Poppins', 
                    weight: '600'
                }
            },
            legend: {
                position: 'bottom',
                labels: {
                    color: colors.textColor,
                    font: {
                        family: 'Poppins'
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                ticks: { color: colors.textColor },
                grid: { color: colors.gridColor }
            },
            y: {
                type: 'logarithmic',
                title: {
                    display: true,
                    text: 'Value (Indexed to 100)',
                    color: colors.textColor
                },
                ticks: { 
                    color: colors.textColor,
                    callback: function(value, index, values) {
                        return value.toLocaleString();
                    }
                },
                grid: { color: colors.gridColor }
            }
        }
    }
});

function updateChartTheme() {
    const newColors = getThemeColors();
    
    chart.options.plugins.title.color = newColors.textColor;
    chart.options.plugins.legend.labels.color = newColors.textColor;
    chart.options.scales.x.ticks.color = newColors.textColor;
    chart.options.scales.x.grid.color = newColors.gridColor;
    chart.options.scales.y.ticks.color = newColors.textColor;
    chart.options.scales.y.grid.color = newColors.gridColor;
    
    chart.update();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    themeToggle.textContent = isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    
    setTimeout(updateChartTheme, 50);
});
