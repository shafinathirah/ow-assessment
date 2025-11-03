const DATA_INDEX = {
  chartConfig: [
    {
      labels: [
        "Social Impact",
        "Infrastructure",
        "Market Attractiveness",
        "System Efficiency",
        "Innovation",
      ],
    },
  ],
  chartData: [
    {
      id: "1",
      city_name: "Warsaw",
      region: "Europe",
      global_data: [52.0, 21.6, 13.6, 55.2, 2.5],
      region_data: [65.0, 65.2, 33.0, 69.2, 23.1],
      city_data: [95.2, 25.28, 45.1, 32.1, 96.2],
    },
    {
      id: "2",
      city_name: "Kuala Lumpur",
      region: "Asia",
      global_data: [22.0, 71.6, 10.6, 25.2, 12.8],
      region_data: [75.0, 15.2, 12.7, 5.2, 53.6],
      city_data: [25.7, 25.28, 42.8, 56.2, 66.2],
    },
    {
      id: "3",
      city_name: "Mexico City",
      region: "Latin America",
      global_data: [27.2, 21.8, 13.6, 15.2, 102.5],
      region_data: [99.0, 62.7, 62.0, 34.2, 23.8],
      city_data: [55.2, 99.28, 45.1, 55.1, 26.2],
    },
  ],
};

const hiddenInput = document.getElementById("selected-city");
const ctx = document.getElementById("radar-chart");
let chartInstance;

const getCityName = () => {
  const inputCity = hiddenInput.value.trim();
  if (inputCity) return inputCity;

  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city_name");

  if (!cityParam) return "Warsaw";

  const found = DATA_INDEX.chartData.find(
    (item) => item.city_name.toLowerCase() === cityParam.toLowerCase()
  );

  return found ? found.city_name : "Warsaw";
};

const renderChart = (cityName) => {
  const dataItem = DATA_INDEX.chartData.find(
    (item) => item.city_name === cityName
  );

  if (!dataItem) {
    console.warn(`City "${cityName}" not found in dataset.`);
    return;
  }

  const labels = DATA_INDEX.chartConfig[0].labels;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Global",
        data: dataItem.global_data,
        borderColor: "rgba(0, 123, 255, 0.8)",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderWidth: 2,
      },
      {
        label: dataItem.region,
        data: dataItem.region_data,
        borderColor: "rgba(255, 193, 7, 0.8)",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderWidth: 2,
      },
      {
        label: dataItem.city_name,
        data: dataItem.city_data,
        borderColor: "rgba(40, 167, 69, 0.8)",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        grid: { color: "#dddddd" },
        angleLines: { color: "#eeeeee" },
        pointLabels: { color: "#333333" },
      },
    },
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Radar Chart for ${cityName}`,
      },
    },
  };

  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, { type: "radar", data: chartData, options });
};

const cityName = getCityName();
hiddenInput.value = cityName;
renderChart(cityName);
