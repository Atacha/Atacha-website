

import {Button} from '../atomic-components/atoms/button/Button.atom'
import {EIcons} from '../atomic-components/atoms/icon/Icon.atom'
export const LoginPage: React.FC = () => {
 
  return (
    <>
      <Button actionText="Ingresa con correo electrónico" icon={EIcons.facebook} />
    </>
  )
}
export default LoginPage
