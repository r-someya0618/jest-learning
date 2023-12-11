/**
 * spyOnでのモック化
 * オブジェクトの特定の関数をモックできる
 * jest.mock()はモジュール全て、もしくは一部をモック化する関数
 * jest.spyOn()は既存のオブジェクトの特定の関数をモック化する関数
 * jest.spyOn()でモック化した場合、mockRestoreメソッドを実行するとオリジナルの関数に戻せる
 * １つのテストケースでのみ関数をモック化し、その他では通常の関数を利用したい場合に活用できる
 */
describe('Math.random with spyOn', () => {
  let spy;

  afterEach(() => {
    spy.mockRestore(); // モック関数を元の関数へ戻す
    // jest.restoreAllMocks() // 全てのモック化した関数をオリジナルの関数に戻す
  });

  it('Math.random return 1', () => {
    spy = jest.spyOn(Math, 'random').mockImplementation(() => 1); // Math.random()は1を返す。元は0から1未満を返す
    expect(Math.random()).toBe(1);
  });

  it('Math.random return under 1', () => {
    expect(Math.random()).toBeLessThan(1); // 1未満である（元の挙動）
  });
});
