const ctx = document.getElementById('asset-chart').getContext('2d');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const years = Array.from({ length: 11 }, (_, i) => 2014 + i);

// Real-world indexed data (2014 = 100)
const sp500Data = [100, 99, 119, 142, 135, 175, 205, 265, 218, 270, 310];
const goldData = [100, 102, 110, 125, 122, 148, 185, 178, 175, 190, 210];
const bitcoinData = [100, 115, 250, 3800, 1100, 2000, 8000, 12500, 5000, 11000, 16000];
const reData = [100, 108, 115, 125, 135, 145, 155, 175, 195, 210, 230];
const m2Data = [100, 106, 113, 119, 125, 132, 155, 177, 181, 172, 168];


function getThemeColors() {
    const style = getComputedStyle(document.body);
    return {
        textColor: style.getPropertyValue('--text-color').trim(),
        gridColor: style.getPropertyValue('--grid-color').trim(),
        bitcoinColor: style.getPropertyValue('--bitcoin-color').trim(),
        goldColor: style.getPropertyValue('--gold-color').trim(),
        sp500Color: style.getPropertyValue('--sp500-color').trim(),
        reColor: style.getPropertyValue('--re-color').trim(),
        m2Color: style.getPropertyValue('--m2-color').trim()
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
            },
            {
                label: 'Real Estate',
                data: reData,
                borderColor: colors.reColor,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Money Supply (M2)',
                data: m2Data,
                borderColor: colors.m2Color,
                backgroundColor: 'rgba(233, 30, 99, 0.1)',
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

// AI Analysis and Zoom Logic
const analyzeBtn = document.getElementById('analyze-btn');
const resetBtn = document.getElementById('reset-btn');
const yearInput = document.getElementById('year-input');
const aiBox = document.getElementById('ai-analysis-result');
const analysisText = document.getElementById('analysis-text');

function getGrowth(data, index) {
    if (index === 0) return 0;
    return ((data[index] - data[index - 1]) / data[index - 1] * 100).toFixed(1);
}

function analyzeYear() {
    const targetYear = parseInt(yearInput.value);
    const index = years.indexOf(targetYear);

    if (index === -1) {
        alert('Please enter a year between 2014 and 2024.');
        return;
    }

    if (index === 0) {
        analysisText.innerHTML = `Data for <strong>${targetYear}</strong> is our baseline (100%). Please select a year from 2015 onwards to see Year-over-Year growth analysis.`;
        aiBox.style.display = 'block';
        return;
    }

    // Growth calculations (YoY)
    const m2Growth = getGrowth(m2Data, index);
    const btcGrowth = getGrowth(bitcoinData, index);
    const spGrowth = getGrowth(sp500Data, index);
    const reGrowth = getGrowth(reData, index);
    const goldGrowth = getGrowth(goldData, index);

    let insight = `### ${targetYear} AI Liquidity Correlation Report\n\n`;
    insight += `Compared to the previous year, the **Money Supply (M2)** expanded by **${m2Growth}%**. \n\n`;
    insight += `**Asset Performance:**\n`;
    insight += `- **Bitcoin:** ${btcGrowth}% \n`;
    insight += `- **S&P 500:** ${spGrowth}% \n`;
    insight += `- **Real Estate:** ${reGrowth}% \n`;
    insight += `- **Gold:** ${goldGrowth}% \n\n`;

    // Correlation Analysis Logic
    insight += `**AI Analysis:** `;
    if (parseFloat(m2Growth) > 8) {
        insight += `The significant increase in M2 (**${m2Growth}%**) created a high-liquidity environment. As expected, the "extra money" flowed into scarce assets. **Bitcoin**, being the most sensitive to liquidity, captured this expansion with a massive **${btcGrowth}%** move, significantly outperforming traditional assets.`;
    } else if (parseFloat(m2Growth) > 0) {
        insight += `Moderate M2 growth of **${m2Growth}%** provided steady support for asset prices. The growth in S&P 500 (**${spGrowth}%**) and Real Estate (**${reGrowth}%**) shows a healthy absorption of new capital into the economy.`;
    } else {
        insight += `M2 growth was stagnant or negative (**${m2Growth}%**). This reduction in market liquidity typically puts downward pressure on risk assets, which is reflected in the more subdued or negative performance of the markers this year.`;
    }

    // Format for HTML
    analysisText.innerHTML = insight
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/### (.*?)<br>/g, '<strong>$1</strong><br>');
    
    aiBox.style.display = 'block';
    
    // No more zooming, just show the data
}

function resetChart() {
    aiBox.style.display = 'none';
    yearInput.value = '';
    // No changes to chart scales
    chart.update();
}

analyzeBtn.addEventListener('click', analyzeYear);
resetBtn.addEventListener('click', resetChart);
