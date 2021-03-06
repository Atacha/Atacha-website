import React from 'react';
import Image from "next/image"



export enum EIcons {
 email = "/images/email.svg",
 google = "/images/google.svg",
 facebook = "/images/fb.svg",
}
export enum EIconPositions {
 left = "left",
 rigth = "rigth",
 center = "center",
}
interface IProps {
 iconSrc : EIcons
}


export const Icon: React.FC<IProps> = ({iconSrc}: IProps) => {
  return (
   <Image src={iconSrc} alt="logo" width={31} height={31} />
  );
};

export default Icon;