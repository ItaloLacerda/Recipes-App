const simulateAPICall = (mock) => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mock),

  }));
};

export default simulateAPICall;
