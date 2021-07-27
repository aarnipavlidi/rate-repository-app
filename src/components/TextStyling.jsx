import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import styling from '../styling';

const styles = StyleSheet.create({
  text: {
    color: styling.colors.textPrimary,
    fontSize: styling.fontSizes.body,
    fontFamily: styling.fonts.main,
    fontWeight: styling.fontWeights.normal,
  },
  colorTextSecondary: {
    color: styling.colors.textSecondary,
    flexWrap: 'wrap'
  },
  colorPrimary: {
    color: styling.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: styling.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: styling.fontWeights.bold,
  },
});

const TextStyling = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return (
    <NativeText style={textStyle} {...props} />
  );
}

export default TextStyling;
