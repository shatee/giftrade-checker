import {Chart} from 'canvasjs/dist/canvasjs.js';
import dateFormat from 'dateformat';

window.onload = () => {
  const giftrade = JSON.parse(document.querySelector('#giftrade').getAttribute('data'));
  const amaten = JSON.parse(document.querySelector('#amaten').getAttribute('data'));

  const chart = new Chart('chart', {
    title: {
      text: 'Rate'
    },
    data: [{
      type: 'area',
      dataPoints: giftrade.map((row) => {
        return {
          x: new Date(row.date),
          y: row.rate
        };
      })
    },{
      type: 'area',
      dataPoints: amaten.map((row) => {
        return {
          x: new Date(row.date),
          y: row.rate
        };
      })
    }],
    axisX: {
      labelFormatter: (e) => {
        return dateFormat(new Date(e.value), 'mm-dd HH:MM');
      },
      valueFormatString: 'MM-DD HH:mm'
    },
    axisY: {
      minimum: 80
    }
  });
  chart.render();
};

document.querySelectorAll('[data-config-toggle]').forEach((toggle) => {
  const key = toggle.dataset.key;
  if (!key) {
    return;
  }
  toggle.addEventListener('click', (event) => {
    const currentValue = event.target.dataset.currentValue;
    if (currentValue === undefined) {
      return;
    }
    const nextValue = currentValue !== 'true';
    fetch('/config', {
      method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
      body: JSON.stringify({
        [key]: nextValue
      })
    }).then(() => {
      location.reload();
    });
  });
});
