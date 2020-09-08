
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { IncomingMessage, ClientRequest, } from "http";
import * as https from "https";
//import * as fs from "fs";
//import { app, } from "electron";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface RequestGroups {
	projectId: string;
	userKey: string;
	page: string;
	limit: string;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default async (request: RequestGroups): Promise<string> => {
	const url: string = `https://api.airbrake.io/api/v4/projects/${request.projectId}/groups?key=${request.userKey}&limit=${request.limit}&page=${request.page}&order=notice_count`;

	// const path: string = `${app.getPath("userData")}/benzo_airbrake_electron_dat`;
	// const fileName: string = `${path}/groups_${request.limit}_${request.page}.json`;

	// // ディレクトリの作成
	// const existPath: boolean = await fs.promises.access(path).then((): boolean => true).catch((): boolean => false);
	// if (!existPath) { await fs.promises.mkdir(path); }

	// // キャッシュの存在確認と生存確認
	// const existFile: boolean = await fs.promises.access(fileName).then((): boolean => true).catch((): boolean => false);
	// if (existFile) {
	// 	const data: string = await fs.promises.readFile(fileName, "utf-8");
	// 	const time: string = JSON.parse(data).time;
	// 	if (Date.now() - new Date(time).getTime() < 1000 * 60 * 60 * 8) { return data; }
	// }

	// 通信を行う
	const response: IncomingMessage = await new Promise((resolve: (res: IncomingMessage) => void, reject: (error: Error) => void) => {
		const req: ClientRequest = https.request(url, resolve);
		req.on("error", reject);
		req.end();
	});

	// 通信結果の確認
	if (response.statusCode === undefined || response.statusCode >= 400) { throw Error(`api groups ${response.statusCode}`); }

	// 通信結果の変換
	const data: string = JSON.stringify({
		time: new Date().toISOString(),
		value: JSON.parse(await new Promise((resolve: (data: string) => void): void => {
			let list: string[] = [];
			response.on("data", chunk => list.push(chunk));
			response.on("end", () => resolve(list.join("")));
		})),
	});

	// // キャッシュとしてデータを残す
	// await fs.promises.writeFile(fileName, data);

	return data;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

