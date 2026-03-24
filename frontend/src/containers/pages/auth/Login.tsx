import { Form, Input, Button, Card, Typography } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Navigate, useNavigate } from 'react-router-dom'
import { PRIVATE_ROUTE } from '@/constants'
import './Login.scss'

const { Title } = Typography

type LoginFormValues = {
  email: string
  password: string
}

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc0Mzc3NzUzLCJpYXQiOjE3NzQzNzQxNTMsImp0aSI6ImVlMTI2ZGI1NDRlOTRhNGQ4ZDQ2MjBhZjc5OWZiYWRjIiwidXNlcl9pZCI6IjEifQ.uMF3U4xY7z-tnOlIlxlqo60E70MsYos1j0rb2AG6mGE'

const Login = () => {
  const navigate = useNavigate()
  if (sessionStorage.getItem('access_token')) {
    return <Navigate to={PRIVATE_ROUTE.HOME} replace />
  }

  const onFinish = (values: LoginFormValues) => {
    console.log('Login data:', values)
    sessionStorage.setItem('access_token', TOKEN)
    console.log('Token guardado en sessionStorage')
    navigate(PRIVATE_ROUTE.HOME)
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={3} className="login-title">
          Iniciar sesión
        </Title>

        <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[
              { required: true, message: 'Ingresa tu correo' },
              { type: 'email', message: 'Correo inválido' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="ejemplo@email.com" size="large" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="********" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
