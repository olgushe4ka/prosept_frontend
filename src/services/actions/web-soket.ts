export const LIVE_ORDER_FEED_CONNECT: "LIVE_ORDER_FEED_CONNECT" =
  "LIVE_ORDER_FEED_CONNECT";

export const LIVE_ORDER_FEED_DISCONNECT: "LIVE_ORDER_FEED_DISCONNECT" =
  "LIVE_ORDER_FEED_DISCONNECT";

export const LIVE_ORDER_FEED_WS_CONNECTING: "LIVE_ORDER_FEED_WS_CONNECTING" =
  "LIVE_ORDER_FEED_WS_CONNECTING";

export const LIVE_ORDER_FEED_WS_OPEN: "LIVE_ORDER_FEED_WS_OPEN" =
  "LIVE_ORDER_FEED_WS_OPEN";

export const LIVE_ORDER_FEED_WS_CLOSE: "LIVE_ORDER_FEED_WS_CLOSE" =
  "LIVE_ORDER_FEED_WS_CLOSE";

export const LIVE_ORDER_FEED_WS_MESSAGE: "LIVE_ORDER_FEED_WS_MESSAGE" =
  "LIVE_ORDER_FEED_WS_MESSAGE";

export const LIVE_ORDER_FEED_WS_ERROR: "LIVE_ORDER_FEED_WS_ERROR" =
  "LIVE_ORDER_FEED_WS_ERROR";

// Типизация экшенов

export interface IwsConnectAction {
  readonly type: typeof LIVE_ORDER_FEED_CONNECT;
  payload: any;
}
export interface IwsDisconnectAction {
  readonly type: typeof LIVE_ORDER_FEED_DISCONNECT;
}
export interface IwsConnectingAction {
  readonly type: typeof LIVE_ORDER_FEED_WS_CONNECTING;
}

export interface IwsOpenAction {
  readonly type: typeof LIVE_ORDER_FEED_WS_OPEN;
}
export interface IwsCloseAction {
  readonly type: typeof LIVE_ORDER_FEED_WS_CLOSE;
}
export interface IwsMessageAction {
  payload: any;
  readonly type: typeof LIVE_ORDER_FEED_WS_MESSAGE;
}

export interface IwsErrorAction {
  payload: string;
  readonly type: typeof LIVE_ORDER_FEED_WS_ERROR;
}

// Объединяем в Union
export type TWSActions =
  | IwsConnectAction
  | IwsDisconnectAction
  | IwsConnectingAction
  | IwsOpenAction
  | IwsCloseAction
  | IwsMessageAction
  | IwsErrorAction;

// Генераторы экшенов

export const wsConnect = (payload: any) => ({
  type: LIVE_ORDER_FEED_CONNECT,
  payload: payload,
});
export const wsDisconnect = () => ({ type: LIVE_ORDER_FEED_DISCONNECT });

// export const wsConnect = (indexOf:any)  => {
//   dispatch({
//     type: LIVE_ORDER_FEED_CONNECT,
//     payload: indexOf,
//   });
// };
