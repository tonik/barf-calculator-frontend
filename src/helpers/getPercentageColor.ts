const getPercentageColor = (value: number) => {
  const hue = ((1-value)*120) > 0 ? ((1-value)*120).toString(10) : 0

  return `hsl(${hue}, 100%, 85%)`
}

export default getPercentageColor
