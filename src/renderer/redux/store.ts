
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";

import { StateTemplate, stateTemplate, } from "@renderer/redux/state/template";
import { StateAirbrake, stateAirbrake, } from "@renderer/redux/state/airbrake";

import middlewareAirbrake from "@renderer/redux/middleware/airbrake";
import middlewareTemplate from "@renderer/redux/middleware/template";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// ストア状態受信構造体
export interface ReduxStoreState {
	stateTemplate: StateTemplate;
	stateAirbrake: StateAirbrake;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// ストア作成
export const store: Redux.Store = Redux.createStore(Redux.combineReducers({
	stateTemplate,
	stateAirbrake,
}), Redux.applyMiddleware(
	middlewareAirbrake,
	middlewareTemplate
));

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

