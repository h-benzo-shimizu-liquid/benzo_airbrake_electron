
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { IncomingMessage, ClientRequest, } from "http";
import * as https from "https";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface RequestNotices {
	projectId: string;
	userKey: string;
	groupId: string;
	page: string;
	limit: string;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default async (request: RequestNotices): Promise<string> => {
	const url: string = `https://api.airbrake.io/api/v4/projects/${request.projectId}/groups/${request.groupId}/notices?key=${request.userKey}&limit=${request.limit}&page=${request.page}`;

	const response: IncomingMessage = await new Promise((resolve: (res: IncomingMessage) => void, reject: (error: Error) => void) => {
		const req: ClientRequest = https.request(url, resolve);
		req.on("error", reject);
		req.end();
	});

	if (response.statusCode === undefined || response.statusCode >= 400) { throw Error(); }

	return new Promise((resolve: (data: string) => void): void => {
		let list: string[] = [];
		response.on("data", chunk => list.push(chunk));
		response.on("end", () => resolve(list.join("")));
	});
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

