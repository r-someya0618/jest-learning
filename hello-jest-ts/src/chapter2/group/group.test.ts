/**
 * 前後処理
 */
// 例）
// let commonData;

// beforeAll(() => {
//   // beforeAllは全てのテスト関数の実行前に一回だけ実行される
//   commonData = {
//     username: 'jest_user',
//     email: 'jest_user@example.com',
//   };
// });

// test('Test case 1', () => {
//   expect(commonData.username).toBe('jest_user');
// });
// test('Test case 2', () => {
//   expect(commonData.username).toBe('jest_user@example.com');
// });

/**
 * 前後処理が実行されるタイミング
 * beforeAll: describe内で定義されている全てのテストの実行前に１回実行される
 * beforeEach: describe内で定義されている定義されているそれぞれのテストの実行前に１回実行される
 * afterAll: describe内で定義されている全てのテストの終了後に１回実行される
 * afterEach: describe内で定義されているそれぞれのテストの終了あとに１回実行される
 */

// グループ１
describe('before/after timing', () => {
  // グループ１の前後処理
  beforeAll(() => console.log('1 - beforeAll'));
  afterAll(() => console.log('1 - afterAll'));
  beforeEach(() => console.log('1 - beforeEach')); // グループ２の前後処理でも実行される
  afterEach(() => console.log('1 - afterEach')); // グループ２の前後処理でも実行される
  // グループ１のテスト
  test('', () => console.log('1 - test1'));

  // グループ2
  describe('Scoped / Nested block', () => {
    // グループ2の前後処理
    beforeAll(() => console.log('2 - beforeAll'));
    afterAll(() => console.log('2 - afterAll'));
    beforeEach(() => console.log('2 - beforeEach'));
    afterEach(() => console.log('2 - afterEach'));
    // グループ２のテスト1
    test('', () => console.log('2 - test1'));
    // グループ２のテスト2
    test('', () => console.log('2 - test2'));
  });
});
