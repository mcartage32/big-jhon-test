import { Menu } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { VscDashboard } from 'react-icons/vsc'
import { CiCalendarDate } from 'react-icons/ci'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { TbLogout } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_ROUTE } from '@/constants'

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
      mode="inline"
      style={{
        background: 'transparent',
        borderRight: 'none'
      }}
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      items={[
        {
          key: '1',
          icon: <VscDashboard size={22} />,
          label: 'Dashboard'
        },
        {
          key: '2',
          icon: <CiCalendarDate size={22} />,
          label: 'Citas'
        },
        {
          key: '3',
          icon: <HiOutlineDocumentReport size={18} />,
          label: 'Reportes'
        },
        {
          key: '4',
          icon: <TbLogout size={18} />,
          label: 'Cerrar sesión'
        }
      ]}
    />
  )
}
