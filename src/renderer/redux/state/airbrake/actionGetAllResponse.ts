
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@renderer/redux/ActionTypes";
import { State, StateGetAllResponse, } from "@renderer/redux/state/airbrake/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetAllResponse extends Redux.Action<ActionTypes> {
	value: StateGetAllResponse;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetAllResponse(value: StateGetAllResponse): ActionGetAllResponse {
	return {
		type: ActionTypes.stateAirbrakeGetAllResponse,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerGetAllResponse(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeGetAllResponse) { return state; }
	const myAction: ActionGetAllResponse = action as ActionGetAllResponse;
	const newState: State = Object.assign({}, state);
	newState.getAllResponse = myAction.value.concat();
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionGetAllResponse = createActionGetAllResponse;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

