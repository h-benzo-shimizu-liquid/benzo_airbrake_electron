
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import apiGroups, { ResponseGroups, } from "@renderer/api/groups";
import apiNotices, { ResponseNotices, } from "@renderer/api/notices";
import { ActionTypes, } from "@renderer/redux/ActionTypes";
import { ReduxStoreState, } from "@renderer/redux/store";
import { StateGetAllResponse, } from "@renderer/redux/state/airbrake/State";
import { stateAirbrakeCreateActionGetAllLoadingCount, } from "@renderer/redux/state/airbrake/actionGetAllLoadingCount";
import { stateAirbrakeCreateActionGetAllResponse, } from "@renderer/redux/state/airbrake/actionGetAllResponse";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetAll extends Redux.Action<ActionTypes> {
	period: number;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetAll(period: number): ActionGetAll {
	return {
		type: ActionTypes.middlewareAirbrakeGetAll,
		period,
	};
}

// ----------------------------------------------------------------

// 命令処理
type TypeArgument1 = Redux.Action<ActionTypes>;
type TypeArgument2 = Redux.Dispatch<TypeArgument1>;
type TypeArgument3 = Redux.MiddlewareAPI<Redux.Dispatch, ReduxStoreState>;
export async function middlewareGetAll(api: TypeArgument3, next: TypeArgument2, action: TypeArgument1): Promise<boolean> {
	if (action.type !== ActionTypes.middlewareAirbrakeGetAll) { return false; }
	const myAction: ActionGetAll = action as ActionGetAll;
	if (api.getState().stateAirbrake.getAllLoadingCount > 0) { return false; }
	if (api.getState().stateAirbrake.getAllResponse !== null) { return false; }
	next(stateAirbrakeCreateActionGetAllLoadingCount(1));

	const projectId: string = api.getState().stateAirbrake.projectId;
	const userKey: string = api.getState().stateAirbrake.userKey;
	const response1: ResponseGroups = await apiGroups({ projectId, userKey, page: "1", limit: "100", });
	console.log("groups", response1);

	const notices: StateGetAllResponse = [];
	const now: number = new Date(response1.time).getTime();
	for (let i: number = 0; i < response1.value.groups.length; i++) {
		const groupId: string = response1.value.groups[i].id;
		const count: number = response1.value.groups[i].noticeCount;
		const limit: number = 1000;
		let page: number = 1;
		while ((page - 1) * limit < count) {
			let isBreak: boolean = false;

			next(stateAirbrakeCreateActionGetAllLoadingCount(api.getState().stateAirbrake.getAllLoadingCount + 1));

			const response2: ResponseNotices = await apiNotices({ projectId, userKey, groupId, page: `${page}`, limit: `${limit}`, });
			console.log("notices", response2);
	
			// 特定の期間のデータを取得
			for (let j: number = 0; j < response2.value.notices.length; j++) {
				const createdAt: number = new Date(response2.value.notices[j].createdAt).getTime();
				if (now - createdAt < myAction.period) {
					notices.push(response2.value.notices[j]);
				} else {
					isBreak = true;
				}
				if (isBreak) { break; }
			}
			if (isBreak) { break; }
	
			page++;
		}
	}

	notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	next(stateAirbrakeCreateActionGetAllResponse(notices));
	next(stateAirbrakeCreateActionGetAllLoadingCount(0));
	return true;

};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const middlewareAirbrakeCreateActionGetAll = createActionGetAll;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

