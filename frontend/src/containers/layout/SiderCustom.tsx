import { Layout } from 'antd'
import MenuSider from './MenuSider'
// import '@/styles/siderCustom.css'
const { Sider } = Layout

interface Props {
  collapsed: boolean
  selectedKey: string
  setSelectedKey: (key: string) => void
}

export default function SiderCustom({ collapsed, selectedKey, setSelectedKey }: Props) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ backgroundColor: '#0e0f24' }}
      collapsedWidth={80}
      width={215}
    >
      {!collapsed && (
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            marginTop: 16
          }}
        ></div>
      )}

      <MenuSider selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
    </Sider>
  )
}
