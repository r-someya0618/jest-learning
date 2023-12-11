import { JSDOM, DOMWindow } from 'jsdom'; // DOM環境をシュミレートするライブラリ
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');

describe('simple ui test', () => {
  let document: Document;
  let window: DOMWindow;

  beforeEach(() => {
    window = new JSDOM(html, { runScripts: 'dangerously' }).window;
    document = window.document;
  });

  //テストケース
  // 初期表示(ボタンの下にメッセージが表示されていないこと)
  it("doesn't show a message at the initial state", () => {
    const message = document.querySelector('#message > p'); // message配下のタグを取得
    expect(message).toBe(null);
  });

  // ボタンがクリックされたらメッセージが表示されていること
  it('shows a message after clicking button', () => {
    const button = document.querySelector('#showMessage'); // ボタン要素を取得
    const click = new window.MouseEvent('click');
    button?.dispatchEvent(click); // buttonをクリックする

    const message = document.querySelector('#message > p'); // message配下のタグを取得
    expect(message?.textContent).toBe('You Passed!');
  });

  // ボタンが２回クリックされても、メッセージは一つであること
  it('shows only one a message after clicking the button twice', () => {
    const button = document.querySelector('#showMessage'); // ボタン要素を取得
    const click = new window.MouseEvent('click');
    button?.dispatchEvent(click); // buttonをクリックする
    button?.dispatchEvent(click); // buttonをクリックする

    const messages = document.querySelectorAll('#message > p'); // message配下のタグを取得
    expect(messages.length).toBe(1); // 要素が一つであること
    expect(messages[0].textContent).toBe('You Passed!');
  });
});
