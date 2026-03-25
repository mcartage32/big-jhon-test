import { Card, Col, Row, Typography } from 'antd'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { useDashboardInfoQuery } from '@/api/reactQuery'
import LoaderPage from '@/components/LoaderPage'
import './index.scss'

const { Title, Text } = Typography

const statusConfig = {
  CANCELLED: {
    label: 'Canceladas',
    icon: <CloseCircleOutlined />,
    color: '#ff4d4f'
  },
  DELIVERED: {
    label: 'Entregadas',
    icon: <CheckCircleOutlined />,
    color: '#52c41a'
  },
  IN_PROGRESS: {
    label: 'En proceso',
    icon: <ClockCircleOutlined />,
    color: '#faad14'
  },
  SCHEDULED: {
    label: 'Programadas',
    icon: <CalendarOutlined />,
    color: '#1677ff'
  }
}

const DashboardPage = () => {
  const { data, isLoading } = useDashboardInfoQuery()

  if (isLoading) return <LoaderPage />

  const statusMap = Object.fromEntries(
    data?.total_by_status.map((item) => [item.status, item.total]) || []
  )

  return (
    <div className="dashboard">
      <Title level={2} className="dashboard__title">
        Dashboard
      </Title>

      <Row gutter={[16, 16]} className="dashboard__row">
        {Object.entries(statusConfig).map(([key, config]) => (
          <Col xs={24} sm={12} md={12} lg={6} key={key}>
            <Card className="dashboard__card" style={{ borderLeft: `6px solid ${config.color}` }}>
              <div className="dashboard__card-content">
                <div
                  className="dashboard__icon"
                  style={{
                    color: config.color,
                    background: `${config.color}20`
                  }}
                >
                  {config.icon}
                </div>

                <div>
                  <Text type="secondary">{config.label}</Text>
                  <Title level={3} style={{ margin: 0 }}>
                    {statusMap[key] || 0}
                  </Title>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="dashboard__today">
        <Col xs={24} md={12} lg={8}>
          <Card className="dashboard__card" style={{ borderLeft: '6px solid #722ed1' }}>
            <div className="dashboard__card-content">
              <div
                className="dashboard__icon"
                style={{
                  color: '#722ed1',
                  background: '#722ed120'
                }}
              >
                <CalendarOutlined />
              </div>

              <div>
                <Text type="secondary">Citas hoy</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {data?.today_appointments || 0}
                </Title>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardPage
