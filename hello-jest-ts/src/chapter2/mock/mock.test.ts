/**
 * Jestのmock化のための関数
 * jest.fn() → モックオブジェクトを作成、jest.mock、jest.spyOnと組み合わせて利用する
 * jest.mock() → オブジェクト全体やオブジェクトの一部のメソッドをモック化する
 * jest.spyOn() → オブジェクトの一部のメソッドをモック化する
 *
 * mockにはcallsとresultsのプロパティが含まれる。
 * calls → モックオブジェクトの呼び出しごとの引数が含まれた配列
 * results → モックオブジェクトの呼び出しごとの結果が含まれた配列
 */

import exp from 'constants';

describe('jest.fn()', () => {
  test('mock object specification', () => {
    const mockFunction = jest.fn();

    // mockFunctionの結果はundefinedである
    expect(mockFunction('foo', 'bar')).toBe(undefined);
    // mockプロパティを持っている
    expect(mockFunction).toHaveProperty('mock');
    // mockにはcallsプロパティを持っている
    expect(mockFunction.mock).toHaveProperty('calls');
    // １回呼び出された
    expect(mockFunction.mock.calls).toHaveLength(1);
    // １回呼び出された際の引数は'foo'と'bar'だった
    expect(mockFunction.mock.calls[0]).toEqual(['foo', 'bar']);
    // mockにはresultsプロパティを持っている
    expect(mockFunction.mock).toHaveProperty('results');
    // １回呼び出された
    expect(mockFunction.mock.results).toHaveLength(1);
    // １回目の返り値はundefinedである
    expect(mockFunction.mock.results[0].value).toBe(undefined);
    // １回目の呼び出しが正常終了した
    expect(mockFunction.mock.results[0].type).toBe('return');
  });
});
/**
 * typeプロパティの値
 * return: 正常終了
 * throw: 異常終了 (実行が失敗し、エラーがthrowされた)
 * incomplete: 実行中 (実行が完了していない)
 */

/**
 * モックオブジェクトの返り値を設定
 */
// mockImplementationで返り値を設定
test('return `Hello`', () => {
  const mockFunction = jest.fn(() => 'Hello');
  const mockFunction2 = jest.fn().mockImplementation(() => 'Hello'); // mockFunctionと意味は同じ
  expect(mockFunction()).toBe('Hello');
  expect(mockFunction2()).toBe('Hello');
});

// mockImplementationで呼び出し毎に異なる返り値を設定
test('return `Hello` once then it returns `Goodbye`', () => {
  const mockFunction = jest
    .fn()
    .mockImplementationOnce(() => 'Hello')
    .mockImplementationOnce(() => 'Goodbye');

  expect(mockFunction()).toBe('Hello');
  expect(mockFunction()).toBe('Goodbye');
  expect(mockFunction()).toBe(undefined);
});
