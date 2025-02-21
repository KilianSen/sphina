import {ReactNode} from "react";

export function Conditional({condition, children}: { condition: boolean, children: ReactNode }) {
	return condition ? <>{children}</> : null
}

