import React from 'react';
import classnames from 'classnames/bind'
import styles from "./button.atom.module.scss"
import {Icon, EIcons, EIconPositions} from '../icon/Icon.atom'

interface IProps {
 icon? : EIcons
 iconPosition?: EIconPositions
 actionText: string
}
let cx = classnames.bind(styles);
export const Button: React.FC<IProps> = ({icon, actionText, iconPosition}:IProps) => {
  let buttonIconStyle = cx({buttonIconStyle: true, rigth: iconPosition === 'rigth' });
  return (
  <button className={styles.button} type='button'>
  {icon && (
   <div className={buttonIconStyle} >
    <Icon iconSrc={icon} />
   </div>
  ) }
  {actionText}
  </button>
  );
};

export default Button;