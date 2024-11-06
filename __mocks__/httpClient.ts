jest.mock('../src/clients/httpClient', () => ({
  HTTP_CLIENT: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}))
