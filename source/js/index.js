import Chart from 'chart.js';

window.onload = () => {
  const data = JSON.parse(document.querySelector('#data').getAttribute('data'));
  const ctx = document.getElementById('chart');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["rate"],
      datasets: [{
        label: "rate",
        data: data.map((row) => {
          return {
            x: row.date,
            y: row.rate
          };
        })
      }]
    }
  });
};

