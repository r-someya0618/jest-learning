// axiosをmock化してUsersクラスのsearch関数をテスト
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch all users', async () => {
  const users = [{ name: 'Bob' }];
  const resp = { data: users };

  (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(resp);
  // 同じ
  // (axios as jest.Mocked<typeof axios>).get.mockImplementation(() =>
  //   Promise.resolve(resp)
  // );

  await expect(Users.search()).resolves.toEqual(users);
});
