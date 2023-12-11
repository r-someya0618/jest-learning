export default {
  // TypescriptをESM構文に変換するpresetを追加
  preset: 'ts-jest/presets/js-with-ts-esm',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Jestでcssのimportができないのでcssをcssモジュールとしてモック化してcssにあるclass nameを検出できるようにする
  },
};
// ts-jest → テスト実行時にtypescriptからjavascriptに変換する
