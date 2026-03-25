import { useState } from 'react'
import { Button, DatePicker, Table, Card } from 'antd'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { IProductLineDeliveryStats } from '@/interfaces'
import { useDeliveryStatsQuery } from '@/api/reactQuery'
import { createNotification } from '@/components/NotificationCustom'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const { RangePicker } = DatePicker

// Traducción product_line
const translateProductLine = (line: string) => {
  switch (line) {
    case 'SHIRTS':
      return 'Camisetas'
    case 'PANTS':
      return 'Pantalones'
    case 'SHOES':
      return 'Zapatos'
    case 'ACCESSORIES':
      return 'Accesorios'
    default:
      return line
  }
}

const ReportsPage = () => {
  const [dates, setDates] = useState<[any, any] | undefined>(undefined)

  const date_from = dates ? dates[0].format('YYYY-MM-DD') : undefined
  const date_to = dates ? dates[1].format('YYYY-MM-DD') : undefined

  const { data, isLoading, refetch } = useDeliveryStatsQuery(date_from, date_to)

  const handleRefresh = async () => {
    try {
      await refetch()
      createNotification.success({
        title: 'Datos actualizados',
        description: 'El reporte se ha recargado correctamente.'
      })
    } catch (error) {
      createNotification.error({
        title: 'Error',
        description: 'No se pudieron actualizar los datos, por favor intente nuevamente.'
      })
    }
  }

  // Preparar datos para Chart.js
  const labels =
    data?.data.map((d: IProductLineDeliveryStats) => translateProductLine(d.product_line)) || []
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Promedio horas',
        data: data?.data.map((d: IProductLineDeliveryStats) => d.avg_hours) || [],
        backgroundColor: 'rgba(24, 144, 255, 0.6)'
      }
    ]
  }

  const tableColumns = [
    {
      title: 'Línea de producto',
      dataIndex: 'product_line',
      key: 'product_line',
      render: translateProductLine
    },
    { title: 'Total entregas', dataIndex: 'total_deliveries', key: 'total_deliveries' },
    { title: 'Promedio horas', dataIndex: 'avg_hours', key: 'avg_hours' },
    { title: 'Promedio minutos', dataIndex: 'avg_minutes', key: 'avg_minutes' }
  ]

  return (
    <Card
      title="Reporte de entregas"
      style={{
        borderRadius: 12,
        minWidth: 325,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center'
      }}
    >
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <RangePicker
          value={dates}
          onChange={(newDates) => newDates && setDates([newDates[0], newDates[1]])}
          allowEmpty={[true, true]}
        />
        <Button onClick={handleRefresh} type="primary">
          Refrescar
        </Button>
      </div>

      <Table
        columns={tableColumns}
        dataSource={data?.data || []}
        rowKey="product_line"
        loading={isLoading}
        pagination={false}
        style={{ marginBottom: 32 }}
        scroll={{ x: 'max-content' }}
      />

      <div style={{ width: '100%', maxHeight: 400 }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // permite que se ajuste al contenedor
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Promedio de horas por línea de producto' }
            },
            scales: {
              x: { ticks: { autoSkip: false } },
              y: { beginAtZero: true }
            }
          }}
          height={300}
        />
      </div>
    </Card>
  )
}

export default ReportsPage
