import styled from 'styled-components'
import { md, sm } from '@/components/layout/responsive'

const Container = styled.button`
  position: relative;
  border: ${p => (p.$border ? p.$border : 'none')};
  border-radius: ${p => (p.$borderRadius ? p.$borderRadius : '5px')};
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${p => (p.$size ? p.$size : '1.5rem')};
  height: ${p => (p.$size ? p.$size : '1.5rem')};
  &:active {
    transform: scale(0.98);
  }
  ${md({
    width: p => (p.$size ? p.$size : '1.5rem'),
  })};
  svg {
    max-height: 100%;
    color: ${p => (p.$strokeColor ? p.$strokeColor : '')};
    stroke: ${p => (p.$strokeColor ? p.$strokeColor : '')};
    fill: ${p => (p.$fillColor ? p.$fillColor : '')};
  }
  &:hover {
    svg {
      color: ${p => (p.$hoverStrokeColor ? p.$hoverStrokeColor : '')};
      fill: ${p => (p.$hoverColor ? p.$hoverColor : '')};
      stroke: ${p => (p.$hoverStrokeColor ? p.$hoverStrokeColor : '')};
    }
  }
`
export const IconButton = ({
  icon: Icon,
  $size,
  type = 'button',
  onClick,
  $hoverColor,
  $strokeColor,
  $hoverStrokeColor,
  $fillColor,
}) => {
  return (
    <Container
      type={type}
      onClick={onClick}
      $size={$size}
      $hoverColor={$hoverColor}
      $hoverStrokeColor={$hoverStrokeColor}
      $strokeColor={$strokeColor}
      $fillColor={$fillColor}
    >
      <Icon />
    </Container>
  )
}
