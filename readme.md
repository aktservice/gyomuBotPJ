# GoogleChatBot を構築する手順です

## 流れ(各参考ページを参照して設定します)

1. 参考ページを参照して Chat 用アプリを開発設定する

   - [参考ページ](https://developers.google.com/workspace/chat/quickstart/apps-script-app?hl=ja "GoogleChatアプリを作成する")

1. チャットアプリのテストが終了したら社内公開する
   - [参考ページ](https://developers.google.com/workspace/chat/apps-publish?hl=ja "GoogleWorkspace　MarketPlace")

### esBuild を使用した開発方法

```bash
# git@github.com:aktservice/gasEsbuildTemp.git
# こちらのPJをテンプレートにして
# 自分のリポジトリを作成して下さい
cd ~/Desktop/

git clone git@github.com:{yourRepo}/yourPJ.git
cd ./yourGasEsbuildTempProject
npm i # or install
cd src

```

- `src`配下にスクリプトファイルを配置してコードを書きます
- [import 文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import "MDN")を使ってコードを書けます
- `npm run build`で`src`フォルダ内を `build` します
- `build` 後は`dist`フォルダ内にバンドルしたソースがはいります
- `clasp push`して GAS へ PUSH して下さい

## 例）

```js

//----------------------------------------------------------------------
//　event.ts
export const CONFIGDATA = {
  CONFIGSHNAME: "config",
  MAINSHEETNAME: "main",
};
/*
 * @description メニュー用
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 29/03/2024
 */
export function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu("実行メニュー");
  menu.addItem("認証", "excuteMain");
  menu.addItem("実行", "excuteMain");
  menu.addToUi();
}

export function getHello() {
  Logger.log("hello");
}


//----------------------------------------------------------------------
// main.ts
import { CONFIGDATA, onOpen, getHello } from "./event";
(global as any).excuteMain = excuteMain;
global.onOpen = onOpen;

export function excuteMain() {
  //補完がききます
  getHello();
}


//----------------------------------------------------------------------
//./dist/main.js

let global = this;
// src/main.ts
function excuteMain() {
}
function onOpen() {
}
(() => {
  // src/event.ts
  var CONFIGDATA = {
    CONFIGMESSAGE: "\u3053\u3093\u306B\u3061\u306F"
  };
  function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu("\u5B9F\u884C\u30E1\u30CB\u30E5\u30FC");
    menu.addItem("\u8A8D\u8A3C", "excuteMain");
    menu.addItem("\u5B9F\u884C", "excuteMain");
    menu.addToUi();
  }
  function getHello(message = "hello") {
    Logger.log(message);
  }

  // src/main.ts
  global.excuteMain = excuteMain;
  global.onOpen = onOpen;
  function excuteMain() {
    const message = CONFIGDATA.CONFIGMESSAGE;
    getHello(message);
  }
})();


//実行すると LOG -> \u3053\u3093\u306B\u3061\u306F
```
