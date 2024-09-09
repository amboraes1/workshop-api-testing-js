const axios = require('axios');
const { expect } = require('chai');

describe('First Api Test', () => {
  let request;

  it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');

    expect(response.status).to.eq(200);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters ', async () => {
    const query = {
      name: 'John,',
      age: '31',
      city: 'New York'
    };
    const response = await axios.get('https://httpbin.org/get', { query });
    expect(response.status).to.eq(200);
    expect(response.config.query).to.eql(query);
  });

  it('Consume HEAD request', async () => {
    request = {
      url: '/',
      method: 'HEAD',
      baseURL: 'https://httpbin.org/',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios(request);
    expect(response.status).eq(200);
  });
  it('Consume PATCH request', async () => {
    request = {
      url: '/patch',
      method: 'PATCH',
      baseURL: 'https://httpbin.org/',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios(request);
    expect(response.status).eq(200);
  });
  it('Consume PUT request', async () => {
    request = {
      url: '/put',
      method: 'PUT',
      baseURL: 'https://httpbin.org/',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios(request);
    expect(response.status).eq(200);
  });
  it('Consume DELETE request', async () => {
    request = {
      url: '/delete',
      method: 'DELETE',
      baseURL: 'https://httpbin.org/',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios(request);
    expect(response.status).eq(200);
  });
});
