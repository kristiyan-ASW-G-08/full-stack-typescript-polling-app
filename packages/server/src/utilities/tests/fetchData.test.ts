import fetch from 'node-fetch';
import fetchData from '@utilities/fetchData';

jest.mock('node-fetch');

const fetchMock = fetch as jest.MockedFunction<typeof fetch>;
const json = jest.fn(() => {});
// @ts-ignore
fetchMock.mockImplementation(() => ({
  json,
}));
describe('fetchData', () => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());
  it('should call node-fetch', async () => {
    await expect(fetchData('url')).resolves;
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('url');
    expect(json).toHaveBeenCalledTimes(1);
  });
});
