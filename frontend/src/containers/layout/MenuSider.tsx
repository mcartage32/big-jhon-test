import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { TbZoomMoney } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { TfiEmail } from 'react-icons/tfi'
import { PRIVATE_ROUTE } from '@/constants'
import { useAuth } from '@/hooks/useAuth'

interface Props {
  selectedKey: string
  setSelectedKey: (key: string) => void
}

export default function MenuSider({ selectedKey, setSelectedKey }: Props) {
  const navigate = useNavigate()
  const refresh_token = sessionStorage.getItem('refresh_token')
  const { logout } = useAuth()

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key)
    switch (key) {
      case '1':
        navigate(PRIVATE_ROUTE.DASHBOARD)
        break
      case '2':
        navigate(PRIVATE_ROUTE.APPOINTMENTS)
        break
      case '3':
        navigate(PRIVATE_ROUTE.REPORTS)
        break
      case '4':
        logout(refresh_token || '')
        break
    }
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      items={[
        {
          key: '1',
          icon: <UserOutlined size={22} />,
          label: 'Dashboard'
        },
        {
          key: '2',
          icon: <TbZoomMoney size={22} />,
          label: 'Citas'
        },
        {
          key: '3',
          icon: <TfiEmail size={18} />,
          label: 'Reportes'
        },
        {
          key: '4',
          icon: <TfiEmail size={18} />,
          label: 'Cerrar sesión'
        }
      ]}
    />
  )
}
