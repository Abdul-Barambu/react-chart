import React, { useState } from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const ChartDemo = () => {

    // Full dataset
    const allLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const allSalesData = [3, 6, 9, 10, 5, 5, 3, 4, 2, 1, 6, 7];
    const allProfitsData = [3, 3, 3, 9, 11, 5, 6, 7, 6, 9, 10, 5];

    // State to manage which months to show
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

    // Slice the data for the current view (8 months)
    const currentLabels = allLabels.slice(currentMonthIndex, currentMonthIndex + 8);
    const currentSalesData = allSalesData.slice(currentMonthIndex, currentMonthIndex + 8);
    const currentProfitsData = allProfitsData.slice(currentMonthIndex, currentMonthIndex + 8);

    // Data for the chart
    const data = {
        labels: currentLabels,
        datasets: [
            {
                label: 'Sales',
                data: currentSalesData,
                backgroundColor: 'black',
                borderRadius: '12',
            },
            {
                label: 'Profits',
                data: currentProfitsData,
                backgroundColor: 'lightgray',
                borderRadius: '12',
            },
        ]
    }

    // Chart options
    const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial',
                        weight: 'bold',
                    },
                    color: 'black',
                },
                position: 'bottom',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Removes vertical grid lines
                },
                ticks: {
                    font: {
                        size: 12,
                        family: 'Courier New',
                        weight: 'normal',
                    },
                    color: 'black',
                    padding: 5,
                },
            },
            y: {
                grid: {
                    display: true,
                    dash: [10, 10], // Dotted horizontal lines
                    offset: true,
                    dashOffset: true,
                },
                ticks: {
                    display: false,
                },
            },
        },
    };

    // Next and Previous buttons handlers
    const handleNext = () => {
        if (currentMonthIndex + 8 < allLabels.length) {
            setCurrentMonthIndex(currentMonthIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(currentMonthIndex - 1);
        }
    };

    return (
        <div>
            <div>
                <h1>Bar Chart Demo</h1>
            </div>

            {/* Chart container with flexbox for buttons inside */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 50 }}>
                {/* Left button */}
                <button
                    onClick={handlePrevious}
                    disabled={currentMonthIndex === 0}
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '20px'  // Space between button and chart
                    }}
                >
                    Previous
                </button>

                {/* Chart */}
                <div style={{ width: '80%' }}>
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>

                {/* Right button */}
                <button
                    onClick={handleNext}
                    disabled={currentMonthIndex + 8 >= allLabels.length}
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: '20px'  // Space between button and chart
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default ChartDemo;
