import { useState } from 'react'
import { Layout } from 'antd'
import SiderCustom from './SiderCustom'
import HeaderCustom from './HeaderCustom'
import ContentCustom from './ContentCustom'

export default function Home() {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('0')

  return (
    <Layout style={{ height: '100vh' }}>
      <SiderCustom
        collapsed={collapsed}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
      <Layout>
        <HeaderCustom collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentCustom />
      </Layout>
    </Layout>
  )
}
