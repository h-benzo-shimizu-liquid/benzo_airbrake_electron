
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@renderer/redux/ActionTypes";
import { State, } from "@renderer/redux/state/airbrake/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetAllLoadingCount extends Redux.Action<ActionTypes> {
	value: number;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetAllLoadingCount(value: number): ActionGetAllLoadingCount {
	return {
		type: ActionTypes.stateAirbrakeGetAllLoadingCount,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerGetAllLoadingCount(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeGetAllLoadingCount) { return state; }
	const myAction: ActionGetAllLoadingCount = action as ActionGetAllLoadingCount;
	const newState: State = Object.assign({}, state);
	newState.getAllLoadingCount = myAction.value;
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionGetAllLoadingCount = createActionGetAllLoadingCount;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

