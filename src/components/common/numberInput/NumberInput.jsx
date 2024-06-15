import styled from 'styled-components';
import { Add, Remove } from "@material-ui/icons";

const AmountContainer = styled.div`
  display: flex;
  height: 100%;
  max-width:${p => p.$size ? "7rem" : "4rem"};
    width: 100%;
    font-size: 18px;
  div{    
    max-width:1.5rem;
    /* padding: 1rem 0.25rem; */
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ddd;
    &:nth-child(1){
      border-radius:5px 0 0 5px;
    }
    &:nth-child(3){
      border-radius:0 5px 5px 0;
    }
    &:nth-child(2){
    /* border-radius: 5px; */
    padding: 0rem 0.4rem;
    border: 2px solid #ddd;
    border-left: 0;
    border-right: 0;
    }
  }

  button{
    all:unset;
    cursor: pointer;
    height:100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:disabled{
      cursor: not-allowed;
    }
    svg{
      width: 80%;
    }
  }
`;

export const NumberInput = ({ value, onClickFunction, item, disableCondition, $size }) => {

  return (
    <AmountContainer $size={$size}>
      <div>
        <button onClick={() => onClickFunction("dec", item)}
          disabled={(value === 1) || disableCondition}>
          <Remove />
        </button>
      </div>

      <div>{value}</div>

      <div>
        <button onClick={() => onClickFunction("inc", item)}
          disabled={(value > 9) || disableCondition}>
          <Add />
        </button>
      </div>
    </AmountContainer>
  )
}
