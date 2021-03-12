const cryptoURL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=45bc4e27-1b16-47c8-b84f-962950dae1ae";

function renderLineGraph(coin) {
  var ctx = document.getElementById("myChart");

  console.log({ coin: coin.quote.USD });

  const [
    ninetyAgoPrice,
    sixtyAgoPrice,
    thirtyAgoPrice,
    sevenAgoPrice,
    dayAgoPrice,
    hourAgoPrice,
    price,
  ] = getHistoricPrices(coin);

  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      yAxisID: "129393",
      labels: ["90d", "60d", "30d", "7d", "24h", "1h", "Current"],
      datasets: [
        {
          label: "Bitcoin price",
          data: [
            ninetyAgoPrice,
            sixtyAgoPrice,
            thirtyAgoPrice,
            sevenAgoPrice,
            dayAgoPrice,
            hourAgoPrice,
            price,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      tooltips: {
        enabled: true,
        mode: 'nearest'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              suggestedMax: price,
              suggestedMin: ninetyAgoPrice,
            },
          },
        ],
      },
    },
  });
}

function calculatePriceFromPercentageChange(price, percentageChange) {
  let denominator;
  if (percentageChange >= 100) {
    percentageChange = percentageChange + 100;
    denominator = percentageChange * 0.01;
    return price / denominator;
  }

  if (percentageChange > 0) {
    denominator = 1 + percentageChange / 100;
    return price / denominator;
  }

  if (percentageChange < 0) {
    const original = price / (1 - percentageChange);
    console.log({ original });
    console.log({ price });
    return original;
  }
}

function getHistoricPrices(coin) {
  const {
    percent_change_90d,
    percent_change_60d,
    percent_change_30d,
    percent_change_7d,
    percent_change_24h,
    percent_change_1h,
    price
  } = coin.quote.USD;

  const ninetyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_90d
  );
  const sixtyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_60d
  );
  const thirtyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_30d
  );
  const sevenAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_7d
  );
  const dayAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_24h
  );
  const hourAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_1h
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

async function getCryptoPrices() {
  const response = await fetch(cryptoURL);
  const jsonData = await response.json();
  const bitcoin = jsonData.data[0];
  renderLineGraph(bitcoin);
}

getCryptoPrices();
