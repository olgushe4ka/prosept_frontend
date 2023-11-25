import { WebsocketStatus } from "../../utils/constants";
import {
  TWSActions,
  LIVE_ORDER_FEED_WS_CONNECTING,
  LIVE_ORDER_FEED_WS_OPEN,
  LIVE_ORDER_FEED_WS_CLOSE,
  LIVE_ORDER_FEED_WS_MESSAGE,
  LIVE_ORDER_FEED_WS_ERROR,
} from "../actions/web-soket";

export type TWSListState = {
  status: string;
  connectionError: string;
  table: any;
};

const initialState: TWSListState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  table: [],
};

export const liveOrderFeedReducer = (
  state = initialState,
  action: TWSActions,
): TWSListState => {
  switch (action.type) {
    case LIVE_ORDER_FEED_WS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    }
    case LIVE_ORDER_FEED_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectionError: "",
      };
    }
    case LIVE_ORDER_FEED_WS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        connectionError: "",
      };
    }

    case LIVE_ORDER_FEED_WS_ERROR: {
      return {
        ...state,
        connectionError: action.payload,
      };
    }

    case LIVE_ORDER_FEED_WS_MESSAGE: {
      return {
        ...state,
        table: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
