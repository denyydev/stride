import { TextStyle } from 'react-native'

export type Typography = {
  h1: TextStyle
  title: TextStyle
  body: TextStyle
  bodyBold: TextStyle
  caption: TextStyle
}

export const typography: Typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
}


