import styled from "@emotion/styled"
import getPercentageColor from "helpers/getPercentageColor"
import { FC } from "react"

export interface ProgressBarProps {
  value: number
  maxValue: number
}
export const ProgressBar: FC<ProgressBarProps> = ({ value, maxValue }) => {
  const percentageValue = (value / maxValue) * 100

  return (
    <Wrapper>
      {percentageValue}%
      <Bar percentageValue={percentageValue} />
      <Overlay />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  overflow-x: visible;
  text-align: center;
  padding: 5px 0;
`

interface BarProps {
  percentageValue: number
}
const Bar = styled.div<BarProps>`
  width: 100%;
  height: 10px;
  background-color: ${({ percentageValue }) => getPercentageColor(percentageValue / 100)};
  transform: ${({ percentageValue }) => `scaleX(${percentageValue / 100})`};
  transform-origin: left;
  border-radius: 4px;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: saturate(5);
`
