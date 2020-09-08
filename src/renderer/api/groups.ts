
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { RequestGroups, } from "@main/api/groups"
import { ipcRenderer, IpcRendererEvent, } from "@renderer/electron";
import { IndexedData, getIndexedData, putIndexedData, } from "@renderer/api/indexedDb"

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface Group {
	id: string;
	projectId: number;
	createdAt: string;
	noticeCount: number;
	noticeTotalCount: number;
	resolved: boolean;
	muted: boolean;
	errors: { message: string; }[];
}

export interface Groups {
	count: number;
	page: number;
	resolvedCount: number;
	unresolvedCount: number;
	groups: Group[];
}

export interface ResponseGroups {
	time: string;
	value: Groups;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default async (request: RequestGroups): Promise<ResponseGroups> => {
	const keyValue: string  = `groups_${request.limit}_${request.page}`;
	const indexedData: IndexedData | undefined = await getIndexedData(keyValue);
	const isForceGet: boolean = (Date.now() - new Date(indexedData?.time || 0).getTime() > 1000 * 60 * 60 * 8);
	const time: string = (!isForceGet && indexedData?.time) || new Date().toISOString();
	const value: string = (!isForceGet && indexedData?.value) || await (async (): Promise<string> => {
		const response: string = await new Promise((resolve: (response: string) => void, reject: (error: Error) => void): void => {
			ipcRenderer.once("groups", (event: IpcRendererEvent, error: Error | null, response: string): void => {
				if (error !== null) { return reject(error); }
				return resolve(response);
			});
			ipcRenderer.send("groups", request);
		});
		const value: string = JSON.stringify(JSON.parse(response).value);

		// サーバから受け取ったデータをローカルに保持
		await putIndexedData({ id: keyValue, time, value, });

		return value;
	})();

	return { time, value: JSON.parse(value), };
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

