import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TWSActions } from "../services/actions/web-soket";
import { rootReducer } from "../services/reducers";

type TApplicationActions = TWSActions;
export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
