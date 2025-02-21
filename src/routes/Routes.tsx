import {Route, Routes as RoutesComponent} from "react-router";
import {NotFound} from "../pages/404.tsx";
import {BaseLayout} from "../layouts/BaseLayout.tsx";
import {NewEvent} from "../pages/NewEvent.tsx";

export function Routes() {
	return (
		<RoutesComponent>
			<Route element={<BaseLayout/>}>
				<Route index element={<NewEvent/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Route>
		</RoutesComponent>
	)
}