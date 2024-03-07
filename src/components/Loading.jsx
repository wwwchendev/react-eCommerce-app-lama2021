import ReactLoading from 'react-loading'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  inset: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  padding: 60px;
  backdrop-filter: blur(5px);
`

export const Loading = ({ active, type, color, delay, height, width }) => {
  return (
    <>
      {active && (
        <Container>
          <ReactLoading
            type={type ? type : 'bubbles'}
            color={'#b2a963'}
            height={60}
            width={150}
          />
        </Container>
      )}
    </>
  )
}
