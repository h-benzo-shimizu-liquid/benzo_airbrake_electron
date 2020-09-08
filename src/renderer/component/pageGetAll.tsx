
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { Link, } from "react-router-dom";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { Notice, } from "@renderer/api/notices";
import { ReduxStoreState, } from "@renderer/redux/store";
import { StateGetAllResponse, } from "@renderer/redux/state/airbrake/State";
import { middlewareAirbrakeCreateActionGetAll, } from "@renderer/redux/middleware/airbrake/actionGetAll";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	const dispatch: Redux.Dispatch = ReactRedux.useDispatch();

	// ステート設定 ストア値
	const storeLoadingCount: number = ReactRedux.useSelector((state: ReduxStoreState): number => state.stateAirbrake.getAllLoadingCount);
	const storeResponse: StateGetAllResponse | null = ReactRedux.useSelector((state: ReduxStoreState): StateGetAllResponse | null => state.stateAirbrake.getAllResponse);
	console.log(storeResponse);

	return (
		<div style={{
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			overflow: "scroll",
		}}>
			<div>csv取得</div>
			<hr></hr>
			{storeLoadingCount > 0? (
				<div>loading {storeLoadingCount}</div>
			) : storeResponse === null  ? (
				<button onClick={(): void => {
					dispatch(middlewareAirbrakeCreateActionGetAll(1000 * 60 * 60 * 24 * 7));
				}}>get data</button>
			) :(
				<div>
					<button onClick={(): void => {
						const data: string = [[
							"id",
							"time",
							"info",
							"error",
							"userToken",
							"userAgent",
						].join(",")].concat(storeResponse.map((notice: Notice): string => [
							`"${notice.id}"`,
							`"${notice.createdAt}"`,
							`"${notice.params?.info || ""}"`,
							`"${notice.errors[0].message}"`,
							`"${notice.context.user.email}"`,
							`"${notice.context.userAgent}"`,
						].join(",")) || []).join("\n");
						const blob: Blob = new Blob([data], { "type": "text/csv", });
						const anchor: HTMLAnchorElement = window.document.createElement("a");
						anchor.download = "all.csv";
						anchor.href = window.URL.createObjectURL(blob);
						anchor.click();
					}}>download csv</button>
					<table style={{ minWidth: "2000px", }}><thead><tr>
						<td style={{ width: "240px", }}>id</td>
						<td style={{ width: "240px", }}>time</td>
						<td style={{ width: "600px", }}>info</td>
						<td style={{ width: "600px", }}>error</td>
						<td style={{ width: "240px", }}>userToken</td>
						<td style={{ width: "1080px", }}>userAgent</td>
					</tr></thead><tbody>{storeResponse.slice(0, 30).map((notice: Notice): JSX.Element => (
						<tr key={notice.id}>{[
							{ value: notice.id },
							{ value: ((date: Date): string => {
								const yy: string = `00${date.getFullYear()}`.slice(-2);
								const MM: string = `00${date.getMonth() + 1}`.slice(-2);
								const dd: string = `00${date.getDate()}`.slice(-2);
								const HH: string = `00${date.getHours()}`.slice(-2);
								const mm: string = `00${date.getMinutes()}`.slice(-2);
								const ss: string = `00${date.getSeconds()}`.slice(-2);
								return `${yy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
							})(new Date(notice.createdAt)) },
							{ value: notice.params?.info || "" },
							{ value: notice.errors[0].message },
							{ value: notice.context.user.email },
							{ value: notice.context.userAgent },
						].map((param: {
							value: string;
						}, index: number): JSX.Element => (
							<td key={`${notice.id}_${index}`} style={{
								position: "relative",
								height: "20px",
							}}>
								<div style={{
									position: "absolute",
									left: 0,
									right: 0,
									top: 0,
									bottom: 0,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}>
									{index > 0 ? param.value : (<a href={`https://liquidinc.airbrake.io/projects/224929/groups/${notice.groupId}/notices/${param.value}?tab=notice-detail`}>{param.value}</a>)}
								</div>
							</td>
						))}</tr>
					))}</tbody></table>
				</div>
			)}
			<hr></hr>
			<Link to="/">top</Link>
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

