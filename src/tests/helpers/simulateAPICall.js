const simulateAPICall = (mock) => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(mock),
  }));
};

export default simulateAPICall;
