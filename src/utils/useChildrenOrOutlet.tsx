import {ReactElement, ReactNode} from "react";
import {Outlet} from "react-router";
import {Conditional} from "./conditional.tsx";

/// ChildOutlet. A component that renders children or an Outlet.
export function ChildOutlet({children}: { children?: ReactNode | ReactElement }) {
	return (
		<>
			<Conditional condition={!!children}>
				{children}
			</Conditional>
			<Conditional condition={!children}>
				<Outlet/>
			</Conditional>
		</>
	)
}