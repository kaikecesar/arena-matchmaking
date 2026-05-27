const mockDelay = (ms = 900): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export { mockDelay }
