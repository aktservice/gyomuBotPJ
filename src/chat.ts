// Compiled using undefined undefined (TypeScript 4.8.4)
/**
 * Responds to a MESSAGE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
export function onMessage(event) {
  var name = "";
  var say = event.message.text;
  if (event.space.type == "DM") {
    name = "You";
  } else {
    name = event.user.displayName;
  }
  var message = findWord(say);
  //ここに解析後のメッセージを組み立てるロジック
  return { text: message };
}
//はいってくるワードを配列に入れて
//配列をまずシートにあてる為にまわして
//あたったらそのシートにする
//シート内A列に再度配列を回す
//シートにあたらなかったら協力依頼のワードと固定ワード
//あたったらB列　外れたら協力依頼のワードと固定ワード
//B列にあたったらC列の回答を
//点数が高いシートは←
function findWord(massage) {
  var retMassage = "ワイヤーがぐしゃぐしゃです";
  var sp = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = sp.getSheets();
  var shName = "etc";
  for (var i = 0; i < sheets.length; i++) {
    var element = sheets[i];
    var tshName = element.getName();
    if (massage.toLowerCase().includes(tshName)) {
      shName = tshName;
      break;
    }
  }
  var key = 0;
  var val = 1;
  var sh = sp.getSheetByName(shName);
  var data =
    sh === null || sh === void 0
      ? void 0
      : sh.getDataRange().getDisplayValues();
  for (var i = 1; i < data.length; i++) {
    var element = data[i][key];
    var ret = data[i][val];
    if (massage.toLowerCase().includes(element)) {
      retMassage = ret;
    }
  }
  return retMassage;
}
/**
 * Responds to an ADDED_TO_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
export function onAddToSpace(event) {
  var message = "";
  if (event.space.singleUserBotDm) {
    message =
      "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message =
      "Thank you for adding me to " +
      (event.space.displayName ? event.space.displayName : "this chat");
  }
  if (event.message) {
    // Bot added through @mention.
    message = message + ' and you said: "' + event.message.text + '"';
  }
  return { text: message };
}
/**
 * Responds to a REMOVED_FROM_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
export function onRemoveFromSpace(event) {
  console.info(
    "Bot removed from ",
    event.space.name ? event.space.name : "this chat"
  );
}
