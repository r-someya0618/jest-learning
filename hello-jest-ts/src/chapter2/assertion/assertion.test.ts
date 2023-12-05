/**
 * テストケースの作成
 */

test('testを利用したテストケースを作成', () => {
  const result = true; //テスト結果
  const expected = true; // 期待値
  expect(result).toBe(expected); // expect関数とtoBe関数を利用して結果を評価する
});

// itはtestのエイリアス
it('itを利用したテストケースを作成', () => {
  expect(true).toBe(true);
});

const numberValue = 0;
const stringValue = '文字列';
const booleanValue = true;

// === プリミティブな値の評価 ===
// toBeでプリミティブな値を評価
/**
 * プリミティブな値が等しいかを、オブジェクトについては同一インスタンスであるかを比較
 */
test('evaluates as equal for all the same primitive values when using the toBe function', () => {
  expect(numberValue).toBe(0);
  expect(stringValue).toBe('文字列');
  expect(booleanValue).toBe(true);
});

// toEqualでプリミティブな値を評価
/**
 * プリミティブな値が等しいかを、オブジェクトについては全プロパティのプリミティブな値が等しいかを再帰的に比較する。
 */
test('evaluates as equal for all the same primitive values when using the toEqual function', () => {
  expect(numberValue).toEqual(0);
  expect(stringValue).toEqual('文字列');
  expect(booleanValue).toEqual(true);
});

// toStrictEqualでプリミティブな値を評価
/**
 * toEqualとほぼ同じだが以下が異なる
 * ・未定義のプロパティとundefinedを値に持つプロパティとを区別する
 * ・配列中の未定義の要素（empty）と、値がundefinedである要素とを区別する
 * ・生成元のクラスを区別する
 */
test('evaluates as equal for all the same primitive values when using the toStrictEqual function', () => {
  expect(numberValue).toStrictEqual(0);
  expect(stringValue).toStrictEqual('文字列');
  expect(booleanValue).toStrictEqual(true);
});

// === オブジェクトの評価 ===
// canの型を定義
type CanType = {
  flavor: string;
  ounces: number;
};

// can1とcan2はそれぞれ同じプロパティと同じ値を持つ
const can1: CanType = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2: CanType = {
  flavor: 'grapefruit',
  ounces: 12,
};

// can3はcan2の参照を持つ
const can3: CanType = can2;

// Canクラス
class Can {
  flavor: string;
  ounces: number;

  constructor({ flavor, ounces }: CanType) {
    this.flavor = flavor;
    this.ounces = ounces;
  }
}

// can4はCanクラスで生成されたオブジェクトで、can1、can2と同じプロパティを持つ
const can4 = new Can({
  flavor: 'grapefruit',
  ounces: 12,
});

// === toBe関数でのオブジェクトの評価 ===
// can1とcan2は同一のインスタンスではないので等しくないと評価される
test('can1 and can2 are not the exact same instance', () => {
  expect(can1).not.toBe(can2);
});

// can3はcan2の参照なので等しいと評価される
test('can2 and can3 are the same instance', () => {
  expect(can2).toBe(can3);
});

// === toEqual関数でのオブジェクトの評価 ===
// can1とcan2のプロパティが再帰的に評価され（deep equality）、同じ値を持っているので異なるインスタンスでも等しいと評価される
test('can1 and can2 have the same properties', () => {
  expect(can1).toEqual(can2);
});

// can2はobject、can4クラスのインスタンスだが、プロパティとその値が同じなので等しいと評価される。
test('can2 and can4 have the same properties', () => {
  expect(can2).toEqual(can4);
});

// === toStrictEqual関数でのオブジェクトの評価 ===
// can2とcan4は、生成元が違うので等しくないと評価される。
test('can2 and can4 are different class', () => {
  expect(can2).not.toStrictEqual(can4);
});
// toEqualを利用した生成元クラスのチェック
test('can2 and can4 are different class(use toEqual)', () => {
  expect(can2.constructor.name).not.toEqual(can4.constructor.name);
});

// === 生成元クラスチェック以外の toStrictEqual と toEqual の違い
test('differences between toEqual and toStrictEqual', () => {
  // toEqual: undefinedを持つプロパティが無視されるので等しいと評価される
  expect({ foo: NaN, bar: undefined }).toEqual({ foo: NaN });

  // toStrictEqual: undefinedを持つプロパティもチェックされるので、等しくないと評価される
  expect({ foo: NaN, bar: undefined }).not.toStrictEqual({ foo: NaN });

  // toEqual: 未定義の要素とundefindedの要素を区別しないので等しいと評価される
  expect([, undefined, 1]).toEqual([undefined, , 1]);

  // toStrictEqual: 未定義の要素とundefindedの要素を区別するので等しくないと評価される
  expect([, undefined, 1]).not.toStrictEqual([undefined, , 1]);
});

/**
 * toBe、toEqual、toStrictEqualの使い分け
 * toBeを利用するケース
 * ・プリミティブな値を評価
 * ・同じオブジェクトの参照を持つ変数であることを評価（例えば引数として渡した同じオブジェクトの変数がreturnされる場合など）
 * toEqualを利用するケース
 * ・オブジェクトのプロパティの値の評価
 * toStrictEqualを利用するケース
 * ・生成元のクラス名や undefinedなプロパティ、配列内の未定義の要素と undefinedの評価を含めた厳密なオブジェクトの評価
 */

// 曖昧な真偽値の評価
test('"0" should be Truthy', () => {
  expect('0').toBeTruthy();
});
test('0 should be Falsy', () => {
  expect(0).toBeFalsy();
});

// null, undefinedの評価
test('should be null', () => {
  expect(null).toBe(null);
  expect(null).toBeNull();
});
test('should be undefined', () => {
  expect(undefined).toBe(undefined);
  expect(undefined).toBeUndefined();
});
test('should be null or undefined', () => {
  let a;
  // == だと暗黙的な型変換でnullとundefinedは同じ値と評価される
  expect(a == null).toBe(true);
  a = null;
  expect(a == null).toBe(true);
});

// 曖昧な結果の評価
/**
 * expect.anything => nullとundefined以外の値を正しいと評価
 * expect.any => 含まれる値の型を指定する事ができる
 * toEqualなどのマッチャーと組み合わせて使う
 */
const hoge = () => ({ hoge: 'hogehoge', number: 0 });
test('hoge return anything', () => {
  // 期待値がnullやundefined出ないことを評価
  expect(hoge()).toEqual(expect.anything());
  // 期待値の一部のプロパティがnullやundefinedではないことを評価
  expect(hoge()).toEqual({ hoge: 'hogehoge', number: expect.anything() });
  // 期待値の一部のプロパティであるnumberがNumber型であることを評価
  expect(hoge()).toEqual({ hoge: 'hogehoge', number: expect.any(Number) });
});

// 浮動小数点数の誤差を許容した数値の評価
test('0.1 + 0.2 returns 0.3', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3); //デフォルトは小数点以下２桁までを評価
});
test('0.301 + 0.3 are different when numDigits is 3', () => {
  expect(0.3 + 0.001).not.toBeCloseTo(0.3, 3); //小数点以下3桁までを評価を評価する場合
});

// 数値に幅を持たせた評価
// toBeGraterThan
test('0.1 + 0.2 is grater than 0.3', () => {
  expect(0.1 + 0.2).toBeGreaterThan(0.3);
  expect(0.1 + 0.2 > 0.3).toBe(true);
});
// toBeGreaterThanOrEqual
test('0.1 + 0.2 is grater than 0.3 or 0.1 + 0.2 equals to 0.30000000000000004', () => {
  expect(0.1 + 0.2).toBeGreaterThanOrEqual(0.3);
  expect(0.1 + 0.2).toBeGreaterThanOrEqual(0.30000000000000004);
  expect(0.1 + 0.2 >= 0.3).toBe(true);
  expect(0.1 + 0.2 >= 0.30000000000000004).toBe(true);
});
// toBeLessThan
test('0.1 + 0.2 is less than 0.4', () => {
  expect(0.1 + 0.2).toBeLessThan(0.4);
  expect(0.1 + 0.2 < 0.4).toBe(true);
});
// toBeLessThanOrEqual
test('0.1 + 0.2 is less than 0.4 or 0.1 + 0.2 equals to 0.30000000000000004', () => {
  expect(0.1 + 0.2).toBeLessThanOrEqual(0.4);
  expect(0.1 + 0.2).toBeLessThanOrEqual(0.30000000000000004);
  expect(0.1 + 0.2 <= 0.4).toBe(true);
  expect(0.1 + 0.2 <= 0.30000000000000004).toBe(true);
});

// 文字列の部分一致（正規表現）
// ある文字の中に特定の文字列が含まれることを評価する
/**
 * expect.stringContaining → 単純な文字列の一致を評価
 * expect.stringMatching、toMatch → 正規表現を利用してより複雑な一致を評価
 */
const log1 = '10.0.0.3 - - [30/Jan/2023:12:20:12 +0000]';
const log2 = '10.0.0.11 - - [30/Jan/2023:12:20:40 +0000]';
const log3 = '10.0.0.99 - - [30/Jan/2023:12:20:40 +0000]';

test('contains 10.0.0.3 IP address', () => {
  expect(log1).toEqual(expect.stringContaining('10.0.0.3'));
});
test('contains IP address between 10.0.0.0 and 10.0.0.99', () => {
  // 10.0.0.0から10.0.0.99までのIPアドレスにマッチするための正規表現
  const expected = /^10.0.0.([1-9]?[0-9])/;

  // expect.stringMatching
  expect(log1).toEqual(expect.stringMatching(expected));
  expect(log2).toEqual(expect.stringMatching(expected));
  expect(log3).toEqual(expect.stringMatching(expected));

  // toMatch
  expect(log1).toMatch(expected);
  expect(log2).toMatch(expected);
  expect(log3).toMatch(expected);

  // toBe
  const regex = new RegExp(expected);
  expect(regex.test(log1)).toBe(true);
  expect(regex.test(log2)).toBe(true);
  expect(regex.test(log3)).toBe(true);
});

/**
 * 配列の部分一致
 * toContain → 配列の要素がプリミティブ型で、そのうち一つの要素が含まれているかを評価
 * toContainEqual → 配列の要素がオブジェクト型で、そのうち一つの要素が含まれているかを評価
 * expect.arrayContaining → 複数の要素を検証する（完全一致ではなく、特定の要素が含まれるか）
 */

// 配列の要素がプリミティブ型の場合
const fruitList = ['Apple', 'Lemon', 'Orange'];

// 一つの要素が含まれていることを検証
test('contains Apple in fruitList', () => {
  expect(fruitList).toContain('Apple');
});

// 複数の要素が含まれていることを検証
test('contains Apple and Orange in fruitList', () => {
  expect(fruitList).toEqual(expect.arrayContaining(['Apple', 'Orange']));
});

// 配列の要素がオブジェクト型の場合
const itemList = [
  { name: 'Apple', price: 100 },
  { name: 'Lemon', price: 150 },
  { name: 'Orange', price: 120 },
];

// 一つの要素が含まれていることを検証
test('contains Apple in itemList', () => {
  expect(itemList).toContainEqual({ name: 'Apple', price: 100 });
});
// 複数の要素が含まれていることを検証
test('contains Apple and Orange in itemList', () => {
  expect(itemList).toEqual(
    expect.arrayContaining([
      { name: 'Apple', price: 100 },
      { name: 'Orange', price: 120 },
    ])
  );
});

/**
 * オブジェクトの部分一致
 * toHaveProperty → オブジェクトのプロパティの１つのみを評価
 * expect.objectContaining → 複数のオブジェクトのプロパティを評価
 */
const ciBuild = {
  number: 1,
  duration: 12000,
  state: 'success',
  triggerParameters: {
    is_scheduled: true,
  },
  type: 'scheduled_pipeline',
  actor: {
    login: 'Taka',
  },
};

// 一つのプロパティを検証
test('build state should be success', () => {
  expect(ciBuild).toHaveProperty('state', 'success');
});
// ネストしたプロパティを検証
test('actor should be Taka', () => {
  expect(ciBuild).toHaveProperty('actor.login', 'Taka');
});

// 複数のプロパティを検証
test('triggered by scheduled pipeline', () => {
  expect(ciBuild).toEqual(
    expect.objectContaining({
      triggerParameters: expect.objectContaining({ is_scheduled: true }),
      type: 'scheduled_pipeline',
    })
  );
});
// test('triggered by scheduled pipeline', () => {
//   expect(ciBuild).toEqual(
//     expect.objectContaining({
//       triggerParameters: {
//         is_scheduled: true,
//       },
//       type: 'scheduled_pipeline',
//     })
//   );
// });

/**
 * Errorの評価
 */
class User {
  name: string;
  password: string;
  constructor({ name, password }: { name: string; password: string }) {
    // passwordが6文字未満の場合Errorをthrowする
    if (password.length < 6)
      throw new Error('The password length must be at least 6 characters.');
    this.name = name;
    this.password = password;
  }
}

test('creates a new user a 6-character password', () => {
  expect(new User({ name: 'hoge', password: '123456' })).toEqual({
    name: 'hoge',
    password: '123456',
  });
});

test('throw Error when the length of password is less than 6', () => {
  // 無名関数の中でエラーを起こさないとテスト自体が止まってしまう
  expect(() => new User({ name: 'hoge', password: '12345' })).toThrow(); // Errorがthrowされたかのチェック
  expect(() => new User({ name: 'hoge', password: '12345' })).toThrow(Error); // 型のチェック
  expect(() => new User({ name: 'hoge', password: '12345' })).toThrow(
    'The password length must be at least 6 characters.'
  ); // エラーメッセージのチェック
});

/*
 * Callback関数を利用した非同期な関数の結果の評価
 */
const fetchDataWidthCallback = (callback) => {
  setTimeout(callback, 3000, 'lemon');
};

// 失敗例 非同期関数の処理の完了を検知できずに下記のエラー文が出る
/**
 * Jest did not exit one second after the test run has completed.
 * 'This usually means that there are asynchronous operations that weren't stopped in your tests.
 * Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
 */
// test('return lemon', () => {
//   const callback = (message: string) => {
//     expect(message).toBe('lemon');
//   };
//   fetchDataWidthCallback(callback);
// });

// 成功例
test('return lemon', (done) => {
  const callback = (message: string) => {
    expect(message).toBe('lemon');
    done(); //テストの終了を宣言;
  };
  fetchDataWidthCallback(callback);
});

/**
 * Promiseを利用した非同期関数の結果の評価
 */
// .resolvesを利用した非同期関数の結果の評価
const fetchDataWidthPromiseResolve = () =>
  new Promise((resolve) => setTimeout(resolve, 1000, 'lemon'));

// .resolvesを利用して成功時の値を受け取る
test('return lemon (return)', () => {
  return expect(fetchDataWidthPromiseResolve()).resolves.toBe('lemon');
});

// async/awaitを利用
test('return lemon (async/await)', async () => {
  await expect(fetchDataWidthPromiseResolve()).resolves.toBe('lemon');
});

// .rejectsを利用した非同期関数の例外処理の評価
const fetchDataWidthPromiseReject = () =>
  new Promise((resolve, reject) =>
    setTimeout(reject, 1000, new Error('lemon does not exist'))
  );

// .resolvesを利用して成功時の値を受け取る
test('failed to return lemon (return)', () => {
  return expect(fetchDataWidthPromiseReject()).rejects.toThrow(
    'lemon does not exist'
  );
});

// async/awaitを利用
test('failed to return lemon(async/await)', async () => {
  await expect(fetchDataWidthPromiseReject()).rejects.toThrow(
    'lemon does not exist'
  );
});
