'use client'

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export function AssessmentRadarChart() {
  const data = {
    labels: ['Navegação', 'Segurança', 'Máquinas', 'Liderança', 'Planejamento', 'Comunicação'],
    datasets: [
      {
        label: 'Competências',
        data: [85, 78, 92, 75, 88, 80],
        backgroundColor: 'rgba(76, 183, 224, 0.2)',
        borderColor: '#4cb7e0',
        borderWidth: 2,
        pointBackgroundColor: '#4cb7e0',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4cb7e0',
        pointHoverBorderColor: '#ffffff',
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#070e2c',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#4cb7e0',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.r}%`
          }
        }
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#e5e7eb',
          lineWidth: 1,
        },
        grid: {
          color: '#e5e7eb',
          lineWidth: 1,
        },
        pointLabels: {
          color: '#374151',
          font: {
            family: 'Segoe UI',
            size: 12,
            weight: '600' as const,
          },
          padding: 10,
        },
        ticks: {
          display: false,
          min: 0,
          max: 100,
          stepSize: 20,
        },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
    interaction: {
      intersect: false,
    },
  }

  return (
    <div className="relative w-full h-full">
      <Radar data={data} options={options} />
    </div>
  )
}