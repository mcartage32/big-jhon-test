import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { TbZoomMoney } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { TfiEmail } from 'react-icons/tfi'
import { PRIVATE_ROUTE } from '@/constants'

interface Props {
  selectedKey: string
  setSelectedKey: (key: string) => void
}

export default function MenuSider({ selectedKey, setSelectedKey }: Props) {
  const navigate = useNavigate()

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key)
    switch (key) {
      case '1':
        navigate(PRIVATE_ROUTE.CONFIGURATION)
        break
      case '2':
        navigate(PRIVATE_ROUTE.DASHBOARD)
        break
      case '3':
        navigate(PRIVATE_ROUTE.CANDIDATES_DOCUMENTS)
        break
      case '4':
        navigate(PRIVATE_ROUTE.HOME)
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
          label: 'Actualizar Proveedores'
        },
        {
          key: '2',
          icon: <TbZoomMoney size={22} />,
          label: 'Subir pagos'
        },
        {
          key: '3',
          icon: <TfiEmail size={18} />,
          label: 'Historial envio emails'
        }
      ]}
    />
  )
}
