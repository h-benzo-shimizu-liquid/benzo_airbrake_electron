
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@renderer/redux/ActionTypes";
import { State, } from "@renderer/redux/state/airbrake/State";
import { defaultProjectId, reducerProjectId, } from "@renderer/redux/state/airbrake/actionProjectId";
import { defaultUserKey, reducerUserKey, } from "@renderer/redux/state/airbrake/actionUserKey";
import { reducerGetCsvIsLoading, } from "@renderer/redux/state/airbrake/actionGetCsvIsLoading";
import { reducerGetCsvResponseGroups, } from "@renderer/redux/state/airbrake/actionGetCsvResponseGroups";
import { reducerGetCsvResponseNotices, } from "@renderer/redux/state/airbrake/actionGetCsvResponseNotices";
import { reducerGetAllLoadingCount, } from "@renderer/redux/state/airbrake/actionGetAllLoadingCount";
import { reducerGetAllResponse, } from "@renderer/redux/state/airbrake/actionGetAllResponse";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// Redux状態初期値
const initialState: State = {
	projectId: defaultProjectId,
	userKey: defaultUserKey,
	getCsvIsLoading: false,
	getCsvResponse: null,
	getAllLoadingCount: 0,
	getAllResponse: null,
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 状態初期化と処理集積
const reducer: Redux.Reducer<State> = (state: State | undefined, action: Redux.Action<ActionTypes>): State => {
	if (state === undefined) { state = Object.assign({}, initialState); }
	state = reducerProjectId(state, action);
	state = reducerUserKey(state, action);
	state = reducerGetCsvIsLoading(state, action);
	state = reducerGetCsvResponseGroups(state, action);
	state = reducerGetCsvResponseNotices(state, action);
	state = reducerGetAllLoadingCount(state, action);
	state = reducerGetAllResponse(state, action);
	return state;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export type StateAirbrake = State;
export const stateAirbrake = reducer;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

