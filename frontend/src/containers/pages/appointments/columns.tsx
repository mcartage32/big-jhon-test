import { Space, Tooltip, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { IAppointment } from '@/interfaces'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import type { useDeleteAppointmentMutation } from '@/api/reactQuery/appointments'
import { createNotification } from '@/components/NotificationCustom'
dayjs.locale('es')

const AppointmentsColumns = (
  deleteAppointment: ReturnType<typeof useDeleteAppointmentMutation>
): ColumnsType<IAppointment> => [
  {
    title: 'Producto',
    dataIndex: 'product_line_display',
    key: 'product'
  },
  {
    title: 'Proveedor',
    dataIndex: 'supplier_display',
    key: 'supplier'
  },
  {
    title: 'Estado',
    dataIndex: 'status_display',
    key: 'status'
  },
  {
    title: 'Fecha programada',
    dataIndex: 'scheduled_at',
    key: 'scheduled_at',
    render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm')
  },
  {
    title: 'Opciones',
    key: 'actions',
    align: 'center' as const,
    render: (_: any, record: IAppointment) => (
      <Space size="middle">
        {/* Editar */}
        <Tooltip title="Editar">
          <EditOutlined
            style={{ color: '#1677ff', cursor: 'pointer', fontSize: 18 }}
            onClick={() => {
              console.log('Editar', record.id)
            }}
          />
        </Tooltip>

        {/* Cancelar */}
        <Popconfirm
          title="¿Cancelar cita?"
          description="Esta acción no se puede deshacer"
          onConfirm={() => {
            deleteAppointment.mutate(record.id, {
              onSuccess: () => {
                createNotification.success({
                  message: 'Cita cancelada',
                  description: 'La cita ha sido cancelada exitosamente'
                })
              },
              onError: (_error: any) => {
                createNotification.error({
                  message: 'Error',
                  description: 'Error al cancelar la cita, por favor intente nuevamente.'
                })
              }
            })
          }}
          okText="Sí"
          cancelText="No"
        >
          <Tooltip title="Cancelar">
            <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer', fontSize: 18 }} />
          </Tooltip>
        </Popconfirm>
      </Space>
    )
  }
]

export default AppointmentsColumns
