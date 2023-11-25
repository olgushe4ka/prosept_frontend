import { Middleware } from "redux";
import { RootState } from "../../types";

export type TWSActions = {
  wsConnect: string;
  wsDisconnect: string;
  wsConnecting: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const socketMiddleware = (
  wsActions: TWSActions,
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: any = null;
    let isConnected: boolean = false;
    let reconnectTimer: number = 0;
    let url: string = "";

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;

      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsConnect) {
        url = action.payload;

        socket = new WebSocket(url);
        isConnected = true;
        // dispatch(wsConnecting());
        dispatch({
          type: wsConnecting,
        });
      }

      if (socket) {
        socket.onopen = () => {
          //dispatch(onOpen());
          dispatch({ type: onOpen });
        };

        socket.onerror = (event: any) => {
          console.log("socket.onerror", event);
        };

        socket.onclose = (event: any) => {
          if (event.code !== 1000) {
            // dispatch(onError(event.code.toString()));
            dispatch({ type: onError, payload: event.code.toString() });
          }

          //dispatch(onClose(event.code.toString()));
          dispatch({ type: onClose, payload: event.code.toString() });

          if (isConnected) {
            //dispatch(wsConnecting());
            dispatch({
              type: wsConnecting,
            });
            reconnectTimer = window.setTimeout(() => {
              //  dispatch(wsConnect(url));
              dispatch({ type: wsConnect, payload: url });
            }, 3000);
          }
        };

        socket.onmessage = (event: any) => {
          const { data } = event;

          const parsedData = JSON.parse(data);

          //dispatch(onMessage(parsedData));
          dispatch({
            type: onMessage,
            payload: parsedData,
          });
        };

        if (type === wsDisconnect) {
          isConnected = false;
          clearTimeout(reconnectTimer);
          reconnectTimer = 0;

          socket.close(1000, "Работа приложения закончена");
        }
      }

      next(action);
    };
  };
};
