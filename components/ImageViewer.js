
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Keyboard } from 'react-native';

export default function ImageViewer({ placeholderImageSource }) {
  const imageSource = placeholderImageSource;
  const [keyboardOpen, setKeyboardOpen] = useState(false);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={[styles.image, keyboardOpen ? styles.image1 : styles.image]}
      >
      </Image>
    </View>
  );
}



const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingTop: 15,
  },
  image: {
    marginTop: 50,
    width: 360,
    height: 241,
  },

  image1: {
    marginTop: 50,
    width: 360,
    height: 241,
    opacity: 0.3
  },
});
