import React from 'react';
import './button.module.scss';
import styles from "./button.module.scss"
import {Icon, EIcons, EIconPositions} from '../icon/Icon.atom'

interface IProps {
 icon? : EIcons
 iconPosition?: EIconPositions
 actionText: string
}
export const Button: React.FC<IProps> = ({icon, actionText, iconPosition}:IProps) => {
  return (
  <button className={styles.button} type='button'>
  {icon && (
   <div className=''>

    <Icon iconSrc={icon} />
   </div>
  ) }
  {actionText}
  </button>
  );
};

export default Button;