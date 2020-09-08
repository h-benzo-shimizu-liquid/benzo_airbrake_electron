
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";
import * as ReactRedux from "react-redux";
import { store, } from "@renderer/redux/store";
import ComponentTemplate from "@renderer/component/template";
import ComponentPageTop from "@renderer/component/pageTop";
import ComponentPageGetCsv from "@renderer/component/pageGetCsv";
import ComponentPageGetAll from "@renderer/component/pageGetAll";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	return (
		<ReactRedux.Provider store = {store}>
			<BrowserRouter>
				<Switch>
					<Route path="/getCsv" component={ComponentPageGetCsv} />
					<Route path="/getAll" component={ComponentPageGetAll} />
					<Route path="/template" component={ComponentTemplate} />
					<Route component={ComponentPageTop} />
				</Switch>
			</BrowserRouter>
		</ReactRedux.Provider>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

