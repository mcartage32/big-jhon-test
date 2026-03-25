import { Modal, Form, Select, DatePicker, Input } from 'antd'
import { useEffect } from 'react'
import {
  useSuppliersListQuery,
  useProductLinesListQuery,
  useAppointmentsStatusesListQuery
} from '@/api/reactQuery'
import dayjs from 'dayjs'

const { TextArea } = Input

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (values: any) => void
  confirmLoading?: boolean
  appointment?: any
}

const UpdateAppointmentModal = ({
  open,
  onClose,
  onSubmit,
  confirmLoading,
  appointment
}: Props) => {
  const [form] = Form.useForm()

  const { data: suppliers } = useSuppliersListQuery()
  const { data: productLines } = useProductLinesListQuery()
  const { data: statuses } = useAppointmentsStatusesListQuery()

  const statusValue = Form.useWatch('status', form)
  const scheduledDate = Form.useWatch('scheduled_at', form)

  // Precargar datos
  useEffect(() => {
    if (appointment && open) {
      form.setFieldsValue({
        ...appointment,
        scheduled_at: appointment.scheduled_at ? dayjs(appointment.scheduled_at) : null,
        delivered_at: appointment.delivered_at ? dayjs(appointment.delivered_at) : null
      })
    }
  }, [appointment, open])

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open])

  const handleFinish = (values: any) => {
    const payload = {
      ...values,
      scheduled_at: values.scheduled_at.toISOString(),
      delivered_at: values.delivered_at ? values.delivered_at.toISOString() : null
    }

    onSubmit(payload)
  }

  return (
    <Modal
      title="Actualizar cita"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Actualizar"
      cancelText="Cancelar"
      destroyOnHidden={true}
      confirmLoading={confirmLoading}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Fecha programada"
          name="scheduled_at"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <DatePicker
            showTime
            style={{ width: '100%' }}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
          />
        </Form.Item>

        <Form.Item
          label="Proveedor"
          name="supplier"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Select
            options={suppliers?.map((s) => ({
              value: s.value,
              label: s.label
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Línea de producto"
          name="product_line"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Select
            options={productLines?.map((p) => ({
              value: p.value,
              label: p.label
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Select
            options={statuses
              ?.filter((s) => {
                if (!appointment) return true

                // Permitir siempre mostrar el estado actual
                if (s.value === appointment.status) return true

                // Reglas de transición
                if (appointment.status === 'DELIVERED') {
                  return s.value === 'CANCELLED' // solo permitir cancelar
                }
                if (appointment.status === 'CANCELLED') {
                  return false
                }
                return true // otros estados permitidos
              })
              ?.map((s) => ({
                value: s.value,
                label: s.label,
                disabled: s.value === appointment?.status && appointment?.status === 'DELIVERED'
                // deshabilitar estado actual si es entregada
              }))}
          />
        </Form.Item>

        {/* Fecha entrega condicional */}
        {statusValue === 'DELIVERED' && (
          <Form.Item
            label="Fecha de entrega"
            name="delivered_at"
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <DatePicker
              showTime
              style={{ width: '100%' }}
              disabledDate={(current) =>
                current &&
                (current < dayjs().add(1, 'day').startOf('day') ||
                  (scheduledDate && current <= scheduledDate.startOf('day')))
              }
            />
          </Form.Item>
        )}
        <Form.Item label="Observaciones" name="observations">
          <TextArea rows={3} placeholder="Opcional..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateAppointmentModal
