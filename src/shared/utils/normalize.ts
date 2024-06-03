const normalize = (value: number) => {
  const min = 0
  const max = parseInt(localStorage.getItem('persistance') ?? '1')

  return Math.round(((value - min) / (max - min)) * (9 - 0) + 0)
}

export default normalize
