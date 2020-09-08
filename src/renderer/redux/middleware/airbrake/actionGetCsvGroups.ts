
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import apiGroups, { ResponseGroups, } from "@renderer/api/groups";
import { ActionTypes, } from "@renderer/redux/ActionTypes";
import { ReduxStoreState, } from "@renderer/redux/store";
import { StateGetCsvResponse, } from "@renderer/redux/state/airbrake/State";
import { stateAirbrakeCreateActionGetCsvIsLoading, } from "@renderer/redux/state/airbrake/actionGetCsvIsLoading";
import { stateAirbrakeCreateActionGetCsvResponseGroups, } from "@renderer/redux/state/airbrake/actionGetCsvResponseGroups";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetCsvGroups extends Redux.Action<ActionTypes> {}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsvGroups(): ActionGetCsvGroups {
	return {
		type: ActionTypes.middlewareAirbrakeGetCsvGroups,
	};
}

// ----------------------------------------------------------------

// 命令処理
type TypeArgument1 = Redux.Action<ActionTypes>;
type TypeArgument2 = Redux.Dispatch<TypeArgument1>;
type TypeArgument3 = Redux.MiddlewareAPI<Redux.Dispatch, ReduxStoreState>;
export async function middlewareGetCsvGroups(api: TypeArgument3, next: TypeArgument2, action: TypeArgument1): Promise<boolean> {
	if (action.type !== ActionTypes.middlewareAirbrakeGetCsvGroups) { return false; }
	if (api.getState().stateAirbrake.getCsvIsLoading) { return false; }
	if (api.getState().stateAirbrake.getCsvResponse !== null) { return false; }
	next(stateAirbrakeCreateActionGetCsvIsLoading(true));

	const projectId: string = api.getState().stateAirbrake.projectId;
	const userKey: string = api.getState().stateAirbrake.userKey;
	const response: ResponseGroups = await apiGroups({ projectId, userKey, page: "1", limit: "100", });
	console.log("groups", response);

	const groups: StateGetCsvResponse = {};
	for (let i: number = 0; i < response.value.groups.length; i++) {
		const groupId: string = response.value.groups[i].id;
		groups[groupId] = { time: response.time, value: response.value.groups[i], loadingCount: 0, list: null, };
	}

	next(stateAirbrakeCreateActionGetCsvResponseGroups(groups));
	next(stateAirbrakeCreateActionGetCsvIsLoading(false));
	return true;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const middlewareAirbrakeCreateActionGetCsvGroups = createActionGetCsvGroups;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

