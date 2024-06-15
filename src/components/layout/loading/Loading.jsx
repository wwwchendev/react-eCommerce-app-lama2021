/* eslint-disable no-unused-vars */
import ReactLoading from 'react-loading'
import styled from 'styled-components'
import { md, sm } from '@/components/layout/responsive';

const Container = styled.div`
  position: ${p => p.$position ? p.$position : "absolute"};
  /* border: 3px solid red; */
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(1.5px);
  z-index: 9;  
  inset: 0;
  ${sm({
  position: 'fixed',
})};
`

export const Loading = ({ active, type, color, delay, size, $position }) => {
  // type LoadingType = "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes";


  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);
  return (
    <>
      {active && (
        <Container $position={$position} >
          <ReactLoading
            type={type ? type : 'bubbles'}
            color={color}
            height={size}
            width={size}
          />
        </Container>
      )}
    </>
  )
}
