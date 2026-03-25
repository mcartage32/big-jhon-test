import { Table, Row, Col, Select, DatePicker, Button, Card, Typography } from 'antd'
import { useState } from 'react'
import {
  useSuppliersListQuery,
  useProductLinesListQuery,
  useAppointmentsStatusesListQuery
} from '@/api/reactQuery'
import {
  useAppointmentsListQuery,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation
} from '@/api/reactQuery/appointments'
import AppointmentsColumns from './columns'
import CreateAppointmentModal from './CreateAppointmentModal'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { createNotification } from '@/components/NotificationCustom'

dayjs.locale('es')
const { Title } = Typography

const AppointmentsPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5
  })

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const { mutate: createAppointment, isPending: isPendingCreateAppointment } =
    useCreateAppointmentMutation()
  const deleteAppointment = useDeleteAppointmentMutation()
  const { data, isLoading } = useAppointmentsListQuery(filters)
  const { data: suppliers } = useSuppliersListQuery()
  const { data: productLines } = useProductLinesListQuery()
  const { data: statuses } = useAppointmentsStatusesListQuery()

  return (
    <>
      <Title level={4} style={{ marginBottom: 16, justifyContent: 'center', display: 'flex' }}>
        Citas de entrega
      </Title>
      <Card
        style={{
          borderRadius: 12,
          minWidth: 325,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {/* Header */}
        <Row gutter={[16, 16]} justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col xs={24} md={18}>
            <Row gutter={[8, 8]}>
              {/* Supplier */}
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Proveedor"
                  allowClear
                  style={{ width: '100%' }}
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, supplier: value, page: 1 }))
                  }
                  options={suppliers?.map((item) => ({
                    key: item.value,
                    value: item.value,
                    label: item.label
                  }))}
                />
              </Col>

              {/* Product Line */}
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Línea"
                  allowClear
                  style={{ width: '100%' }}
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, product_line: value, page: 1 }))
                  }
                  options={productLines?.map((item) => ({
                    key: item.value,
                    value: item.value,
                    label: item.label
                  }))}
                />
              </Col>

              {/* Status */}
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Estado"
                  allowClear
                  style={{ width: '100%' }}
                  onChange={(value) => setFilters((prev) => ({ ...prev, status: value, page: 1 }))}
                  options={statuses
                    ?.filter((item) => item.value !== 'CANCELLED')
                    ?.map((item) => ({
                      key: item.value,
                      value: item.value,
                      label: item.label
                    }))}
                />
              </Col>

              {/* Date */}
              <Col xs={24} sm={12} md={6}>
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Fecha"
                  onChange={(date) =>
                    setFilters((prev) => ({
                      ...prev,
                      scheduled_date: date ? dayjs(date).format('YYYY-MM-DD') : undefined,
                      page: 1
                    }))
                  }
                />
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={6} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              size="large"
              style={{ width: '100%' }}
              onClick={() => setOpenCreateModal(true)}
            >
              Crear cita
            </Button>
          </Col>
        </Row>

        <Table
          columns={AppointmentsColumns(deleteAppointment)}
          dataSource={data?.data || []}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: data?.page,
            pageSize: filters.limit,
            total: data?.total,
            onChange: (page, pageSize) =>
              setFilters((prev) => ({
                ...prev,
                page,
                limit: pageSize
              }))
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
      <CreateAppointmentModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSubmit={(values) => {
          createAppointment(values, {
            onSuccess: () => {
              setOpenCreateModal(false)
              createNotification.success({
                message: 'Cita creada',
                description: 'La cita ha sido creada exitosamente'
              })
            },
            onError: (_error: any) => {
              createNotification.error({
                message: 'Error',
                description: 'Error al crear la cita, por favor verifique los campos ingresados.'
              })
            }
          })
        }}
        confirmLoading={isPendingCreateAppointment}
      />
    </>
  )
}

export default AppointmentsPage
