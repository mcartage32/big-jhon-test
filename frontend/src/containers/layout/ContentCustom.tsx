import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

export default function ContentCustom() {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <Content
      style={{
        height: 'calc(100vh - 64px)', // menos el header
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG
        }}
      >
        <Outlet />
      </div>
    </Content>
  )
}
