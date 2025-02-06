import { CONFIGDATA, onOpen, getHello } from "./event";
import * as chat from "./chat";
(global as any).excuteMain = excuteMain;
global.onOpen = onOpen;
global.onMessage = chat.onMessage;

export function excuteMain() {
  //補完がききます
  const message = CONFIGDATA.CONFIGMESSAGE;
  getHello(message);
}
