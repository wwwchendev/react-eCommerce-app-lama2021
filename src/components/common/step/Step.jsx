import styled from 'styled-components'

export const Circle = styled.div`
  width: 29px;
  height: 29px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#000000' : '#dadada'};
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CircleWrapper = styled.div`
  position: relative;
`

export const StepBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: ${({ $disable }) => ($disable ? 'not-allowed' : 'pointer')};
  span {
    font-size: 14px;
    color: ${({ $isSelected }) => ($isSelected ? '#000000' : '#dadada')};
  }
`

export const PrimaryButton = styled.button`
  padding: 10px 25px;
  background-color: ${({ disabled }) => (disabled ? '#000000' : '#000000')};
  border: none;
  margin: 10px;
  color: white;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`
export const Step = ({ selected, index, updateStep, label, disabledSteps }) => {
  const handleClick = () => {
    if (!selected && !disabledSteps.includes(index + 1)) {
      updateStep(index + 1)
    }
  }

  return (
    <StepBlock
      $isSelected={selected}
      onClick={handleClick}
      $disable={disabledSteps.includes(index + 1)} // 使用 $disable
    >
      <CircleWrapper>
        <Circle $isSelected={selected}>{index + 1}</Circle>
      </CircleWrapper>
      <span>{label}</span>
    </StepBlock>
  )
}

export const StepWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`

export const StepNavigation = ({
  labelArray,
  updateStep,
  currentStep,
  disabledSteps,
}) => {
  return (
    <StepWrapper>
      {labelArray.map((item, index) => (
        <Step
          key={index}
          index={index}
          label={item}
          updateStep={updateStep}
          selected={currentStep === index + 1}
          disabledSteps={disabledSteps}
        />
      ))}
    </StepWrapper>
  )
}
