import { Layout, theme, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header } = Layout

interface HeaderCustomProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

export default function HeaderCustom({ collapsed, setCollapsed }: HeaderCustomProps) {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        boxShadow: '0 2px 8px black',
        zIndex: 1,
        position: 'relative'
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64
        }}
      />
    </Header>
  )
}
