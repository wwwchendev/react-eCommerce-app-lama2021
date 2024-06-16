export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}

import { createTheme } from '@material-ui/core/styles'
const theme = createTheme({
  breakpoints: {
    values: {
      xs: breakpoints.xs,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },
})
export default theme

import { css } from 'styled-components'
export const xs = styles => css`
  @media (max-width: ${breakpoints.sm - 1}px) {
    ${styles}
  }
`
export const sm = styles => css`
  @media (max-width: ${breakpoints.md - 1}px) {
    ${styles}
  }
`
export const md = styles => css`
  @media (max-width: ${breakpoints.lg - 1}px) {
    ${styles}
  }
`
export const lg = styles => css`
  @media (max-width: ${breakpoints.xl - 1}px) {
    ${styles}
  }
`
export const xl = styles => css`
  @media (min-width: ${breakpoints.xl}px) {
    ${styles}
  }
`
