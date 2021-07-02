const cryptoURL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD&CMC_PRO_API_KEY=45bc4e27-1b16-47c8-b84f-962950dae1ae";

function renderLineGraph(coins) {
  const ctx = document.getElementById("myChart");
  const [ninetyAgoPrice] = getHistoricPrices(coins[0]);

  const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"];
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeAgo,
      datasets: [
        {
          label: "Bitcoin",
          borderWidth: 1,
          data: getHistoricPrices(coins[0]),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Etherum",
          borderWidth: 1,
          data: getHistoricPrices(coins[1]),
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          label: "Price",
          borderWidth: 1,
          data: getHistoricPrices(coins[2]),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    },
    options: {
      tooltips: {
        enabled: true,
        mode: "nearest",
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || "";

            if (label) {
              label += ": ";
            }
            label += formatter.format(
              Math.round(tooltipItem.yLabel * 100) / 100,
            );
            return label;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              suggestedMin: ninetyAgoPrice,
              suggestedMax: 60,
            },
          },
        ],
      },
    },
  });
}

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
  let denominator;
  let historicPrice;
  if (percentageChange >= 100) {
    percentageChange = percentageChange + 100;
    denominator = percentageChange * 0.01;
    historicPrice = currentPrice / denominator;
  }

  if (percentageChange < 100 && percentageChange > 0) {
    denominator = 1 + percentageChange / 100;
    historicPrice = currentPrice / denominator;
  }

  if (percentageChange < 0) {
    const original = (currentPrice / (100 + percentageChange)) * 100;
    historicPrice = original;
  }
  return historicPrice;
}

function getHistoricPrices(coin) {
  const {
    percent_change_90d,
    percent_change_60d,
    percent_change_30d,
    percent_change_7d,
    percent_change_24h,
    percent_change_1h,
    price,
  } = coin.quote.USD;

  const ninetyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_90d,
  );
  const sixtyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_60d,
  );
  const thirtyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_30d,
  );
  const sevenAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_7d,
  );
  const dayAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_24h,
  );
  const hourAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_1h,
  );

  return [
    ninetyAgoPrice,
    sixtyAgoPrice,
    thirtyAgoPrice,
    sevenAgoPrice,
    dayAgoPrice,
    hourAgoPrice,
    price,
  ];
}

function getDayAgoDates() {
  const ninetyAgo = new Date();
  ninetyAgo.setDate(ninetyAgo.getDate() - 90);
  const sixtyAgo = new Date();
  sixtyAgo.setDate(sixtyAgo.getDate() - 60);
  const thirtyAgo = new Date();
  thirtyAgo.setDate(thirtyAgo.getDate() - 30);
  const sevenAgo = new Date();
  sevenAgo.setDate(sevenAgo.getDate() - 7);
  return [
    ninetyAgo.toLocaleString(),
    sixtyAgo.toLocaleString(),
    thirtyAgo.toLocaleString(),
    sevenAgo.toLocaleString(),
  ];
}

async function getCryptoPrices() {
  const response = await fetch(cryptoURL);
  const jsonData = await response.json();
  renderLineGraph(jsonData.data);
}

getCryptoPrices();
