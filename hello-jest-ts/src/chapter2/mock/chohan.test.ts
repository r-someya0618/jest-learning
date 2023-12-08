/**
 * jest.mock()でのmock化
 */
import { chohan } from './chohan';

// chohan関数が内部的に呼び出すseed関数をmockする
jest.mock('./seed', () => {
  // seedのmock化
  return {
    seed: jest
      .fn()
      .mockImplementationOnce(() => 2) // １回目に偶数を返す
      .mockImplementationOnce(() => 1), // ２回めに奇数を返す
  };
});

describe('chohan', () => {
  it('return 丁 when seed return an even number like 2', () => {
    expect(chohan()).toBe('丁');
  });
  it('return 半 when seed return an even number like 1', () => {
    expect(chohan()).toBe('半');
  });
});
