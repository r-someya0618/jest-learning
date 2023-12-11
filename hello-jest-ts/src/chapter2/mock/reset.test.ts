import { mock } from 'node:test';

/**
 * モックのリセット
 * ※ mockFn → jest.fn()で作成されたモックオブジェクト
 * mockFn.mockClear(): mockFn関数のmockのプロパティをリセットする
 * mockFn.mockReset(): mockFn関数のmockのプロパティをリセットし、設定したmock関数をクリアする。オリジナルには戻らない
 * mockFn.mockRestore(): mockFn関数のmockのプロパティをリセットし、設定したmock関数をクリアする。spyOnでモック化した関数はオリジナルの関数へ戻る
 *
 * 全てのモックオブジェクトのリセット
 * jest.clearAllMocks(): 全てのモックオブジェクトのmockのプロパティをリセットする
 * jest.resetAllMocks(): 全てのモックオブジェクトのプロパティをリセットし、設定したmock関数をクリアする。オリジナルには戻らない
 * jest.restoreAllMocks(): 全てのモックオブジェクトのプロパティをリセットし、設定したmock関数をクリアする。spyOnでモック化した関数はオリジナルの関数へ戻る
 */
describe('#reset mocks with jest.fn', () => {
  const targetDate = '2020-12-25';
  const mockDate = new Date('2019-12-25');

  beforeEach(() => {
    Date = jest.fn(() => mockDate) as unknown as jest.MockedFunction<typeof Date>;
  });

  it('jest.clearAllMocks', () => {
    // new DateでmockDate以外の値を指定してもモック化されているため、必ずmockDateがreturnされる
    expect(new Date(targetDate)).toEqual(mockDate);
    // new Dateの引数であるtargetDateの値がセットされている
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([
      ['2020-12-25'],
    ]);
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([
      { type: 'return', value: mockDate },
    ]);

    // リセット
    jest.clearAllMocks();

    // mockの全てのプロパティがリセットされる
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([]);
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([]);

    // mock関数は引き続き利用できる
    expect(new Date(targetDate)).toEqual(mockDate);
  });

  it('jest.resetAllMocks', () => {
    expect(new Date(targetDate)).toEqual(mockDate);
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([
      ['2020-12-25'],
    ]);
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([
      { type: 'return', value: mockDate },
    ]);

    // リセット
    jest.resetAllMocks();

    // mockの全てのプロパティがリセットされる
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([]);
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([]);

    // mock関数もリセットされ（実装がなかったことになり、デフォルトでは{}が返される）
    expect(new Date(targetDate)).toEqual({});
  });

  it('jest.restoreAllMocks', () => {
    expect(new Date(targetDate)).toEqual(mockDate);
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([
      ['2020-12-25'],
    ]);
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([
      { type: 'return', value: mockDate },
    ]);

    // リセット
    jest.restoreAllMocks();

    // mockの全てのプロパティがリセットされる
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([]);
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([]);

    // mock関数もリセットされ（実装がなかったことになり、デフォルトでは{}が返される）
    // jest.spyOn()でモックした場合はオリジナルの関数へ戻る
    expect(new Date(targetDate)).toEqual({});
  });
});
