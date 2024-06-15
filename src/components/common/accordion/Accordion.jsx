import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown as Down } from '@material-ui/icons';
import HTMLReactParser from "html-react-parser";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Item = styled.div`
  box-shadow: 0 0 32px rgba(0,0,0,0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  div {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;
  }

  span {
    font-weight: bolder;
    color: #333;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    width: 2rem;
    height: 2rem;
    cursor: pointer;

    svg {
      height: 100%;
      transform: ${p => (p.$isActived ? 'rotate(90deg)' : '')};
      transition: transform 0.5s ease-in-out;
    }
  }
`;

const HiddenBox = styled.div`
  line-height: 2;
  height: ${p => (p.$height)};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
      margin-top: ${p => (p.$isActived ? '1rem' : '')};
`;

export const Accordion = ({ id, question, answer }) => {
  const [isActive, setIsActive] = useState(false);
  const [height, setHeight] = useState('0px');
  const contentRef = useRef(null);


  // 當你的手風琴動畫在收闔時看起來有點卡頓，是因為內容的高度在動畫過程中是動態變化的，這會導致瀏覽器在動畫期間重新計算高度。為了改善這一點，我們可以使用 height 代替 max-height，並且更精確地測量內容的高度來確保動畫的平滑。
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isActive]);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <Container>
      <Item >
        <Title $isActived={isActive} onClick={toggleAccordion}>
          <div>
            <span>{id}.</span>
            <h2>{question}</h2>
          </div>
          <button>
            <Down />
          </button>
        </Title>
        <HiddenBox ref={contentRef} $height={height} $isActived={isActive}>

          <div>{HTMLReactParser(answer)}</div>
        </HiddenBox>
      </Item>
    </Container>
  );
}
