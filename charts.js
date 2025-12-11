// Hospital Dashboard Charts with Dummy Data
// Chart color palette matching the theme
const chartColors = {
  primary: '#5350c4',
  primaryLight: '#7573d6',
  primaryDark: '#3d39ac',
  secondary: '#c8c7ff',
  accent1: '#6f6bc2',
  accent2: '#9b99d1',
  accent3: '#f2f2ff',
  success: '#4caf50',
  warning: '#ff9800',
  danger: '#f44336',
  info: '#2196f3'
};

// Dummy Data for Room Availability (Doughnut Chart)
const roomData = {
  labels: ['Tersedia', 'Terisi', 'Dalam Perbaikan'],
  datasets: [{
    data: [25, 45, 5],
    backgroundColor: [
      chartColors.success,
      chartColors.primary,
      chartColors.warning
    ],
    borderColor: '#ffffff',
    borderWidth: 3,
    hoverOffset: 8
  }]
};

// Dummy Data for Doctor Schedule (Bar Chart)
const scheduleData = {
  labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  datasets: [
    {
      label: 'Dokter Umum',
      data: [8, 10, 7, 9, 11, 6, 4],
      backgroundColor: chartColors.primary,
      borderRadius: 6,
      barThickness: 16
    },
    {
      label: 'Dokter Spesialis',
      data: [5, 6, 8, 7, 5, 4, 2],
      backgroundColor: chartColors.info,
      borderRadius: 6,
      barThickness: 16
    },
    {
      label: 'Dokter Jaga',
      data: [3, 3, 3, 3, 3, 2, 2],
      backgroundColor: chartColors.warning,
      borderRadius: 6,
      barThickness: 16
    }
  ]
};

// Dummy Data for Medicine Stock (Line Chart)
const medicineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  datasets: [
    {
      label: 'Obat Umum',
      data: [1200, 1150, 1300, 1250, 1100, 1400, 1350, 1200, 1450, 1500, 1380, 1420],
      borderColor: chartColors.primary,
      backgroundColor: 'rgba(83, 80, 196, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: chartColors.primary,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2
    },
    {
      label: 'Antibiotik',
      data: [450, 420, 480, 510, 390, 550, 520, 470, 600, 580, 540, 560],
      borderColor: chartColors.success,
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: chartColors.success,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2
    },
    {
      label: 'Obat Khusus',
      data: [180, 200, 165, 220, 190, 240, 210, 195, 260, 275, 250, 230],
      borderColor: chartColors.danger,
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: chartColors.danger,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2
    }
  ]
};

// Chart Options
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          family: "'Inter', sans-serif",
          size: 11
        },
        padding: 15,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    }
  }
};

// Room Chart (Doughnut) Options
const roomChartOptions = {
  ...commonOptions,
  cutout: '60%',
  plugins: {
    ...commonOptions.plugins,
    title: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((context.raw / total) * 100).toFixed(1);
          return `${context.label}: ${context.raw} ruangan (${percentage}%)`;
        }
      }
    }
  }
};

// Schedule Chart (Bar) Options
const scheduleChartOptions = {
  ...commonOptions,
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 10
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(83, 80, 196, 0.1)'
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 10
        },
        stepSize: 2
      },
      title: {
        display: true,
        text: 'Jumlah Dokter',
        font: {
          family: "'Inter', sans-serif",
          size: 11
        }
      }
    }
  },
  plugins: {
    ...commonOptions.plugins,
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.raw} dokter`;
        }
      }
    }
  }
};

// Medicine Chart (Line) Options
const medicineChartOptions = {
  ...commonOptions,
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 10
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(83, 80, 196, 0.1)'
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 10
        }
      },
      title: {
        display: true,
        text: 'Stok (unit)',
        font: {
          family: "'Inter', sans-serif",
          size: 11
        }
      }
    }
  },
  plugins: {
    ...commonOptions.plugins,
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.raw} unit`;
        }
      }
    }
  }
};

// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
  // Room Availability Chart (Doughnut)
  const roomCtx = document.getElementById('roomChart');
  if (roomCtx) {
    new Chart(roomCtx, {
      type: 'doughnut',
      data: roomData,
      options: roomChartOptions
    });
  }

  // Doctor Schedule Chart (Bar)
  const scheduleCtx = document.getElementById('scheduleChart');
  if (scheduleCtx) {
    new Chart(scheduleCtx, {
      type: 'bar',
      data: scheduleData,
      options: scheduleChartOptions
    });
  }

  // Medicine Stock Chart (Line)
  const medicineCtx = document.getElementById('medicineChart');
  if (medicineCtx) {
    new Chart(medicineCtx, {
      type: 'line',
      data: medicineData,
      options: medicineChartOptions
    });
  }
});
