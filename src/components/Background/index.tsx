import React, { ReactNode } from 'react';
import { ImageBackground } from 'react-native'

import { styles } from "./styles";

type Props = {
    children: ReactNode;
  };
  
  export function Background({ children }: Props) {
    const { secondary100, secondary80 } = theme.colors;
    return (
      <LinearGradient
        style={styles.container}
        colors={[secondary80, secondary100]}
      >
        {children}
      </LinearGradient>
    );
  }