import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View, KeyboardAvoidingView } from 'react-native'

import { styles } from "./styles";

import ImagemFundo from '../assets/fundo.png'

type Props = {
  children: ReactNode;
}
  
  export function Background({ children }: Props) {
    return (
      <ImageBackground  style={styles.imgContainer} source={ImagemFundo}>
        
      </ImageBackground>
    );
  }