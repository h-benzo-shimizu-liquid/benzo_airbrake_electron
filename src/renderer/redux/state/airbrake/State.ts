
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { Group, } from "@renderer/api/groups";
import { Notice, } from "@renderer/api/notices";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface StateGetCsvResponseNotice {
	time: string;
	value: Notice;
};

export interface StateGetCsvResponseGroup {
	time: string;
	value: Group;
	loadingCount: number;
	list: StateGetCsvResponseNotice[] | null;
};

export type StateGetCsvResponse = {
	[key: string]: StateGetCsvResponseGroup;
};

export interface State {
	projectId: string;
	userKey: string;
	getCsvIsLoading: boolean;
	getCsvResponse: StateGetCsvResponse | null;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

