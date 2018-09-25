import nock from 'nock';
import FetchService from '../index';

const TEST_URL = 'http://127.0.0.1:7783';

const query = {
  $sort: {
    createdAt: -1
  }
};

describe('utils/fetch-service/index', () => {
  // beforeAll(() => {

  // });

  // afterAll(() => {

  // });

  nock(TEST_URL)
    .persist()
    .get('/')
    .reply(200, {
      username: 'pgte',
      email: 'pedro.teixeira@gmail.com'
    })
    .get('/user')
    .reply(200, {
      username: 'pgte23',
      email: 'pedro23.teixeira@gmail.com'
    })
    .get('/users')
    .query(query)
    .reply(200, {
      username: 'particle4dev',
      email: 'particle4dev@gmail.com'
    })
    .post('/', () => true)
    .reply(201, (uri, requestBody, cb) => {
      cb(null, requestBody);
    })
    .post('/users', () => true)
    .reply(201, (uri, requestBody, cb) => {
      cb(null, requestBody);
    });

  const fetch = new FetchService({
    name: '',
    options: {},
    base: TEST_URL
  });

  it('find', async () => {
    let res = await fetch.find();
    expect(res.username).toEqual('pgte');
    expect(res.email).toEqual('pedro.teixeira@gmail.com');

    res = await fetch.find('user');
    expect(res.username).toEqual('pgte23');
    expect(res.email).toEqual('pedro23.teixeira@gmail.com');

    res = await fetch.find('users', {
      query
    });
    expect(res.username).toEqual('particle4dev');
    expect(res.email).toEqual('particle4dev@gmail.com');
  });

  it('get', async () => {
    let res = await fetch.get('user');
    expect(res.username).toEqual('pgte23');
    expect(res.email).toEqual('pedro23.teixeira@gmail.com');

    res = await fetch.get('users', {
      query
    });
    expect(res.username).toEqual('particle4dev');
    expect(res.email).toEqual('particle4dev@gmail.com');
  });

  it('create', async () => {
    let res = await fetch.create('users', {
      username: 'particle4dev',
      email: 'particle4dev@gmail.com'
    });
    expect(res.username).toEqual('particle4dev');
    expect(res.email).toEqual('particle4dev@gmail.com');

    res = await fetch.create('', {
      username: 'particle4dev',
      email: 'particle4dev@gmail.com'
    });
    expect(res.username).toEqual('particle4dev');
    expect(res.email).toEqual('particle4dev@gmail.com');
  });
});
