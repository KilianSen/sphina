import {useState} from "react";

export function useHover() {
	const [hovered, setHovered] = useState(false);
	return {
		hovered,
		bind: {
			onMouseEnter: () => setHovered(true),
			onMouseLeave: () => setHovered(false)
		}
	};
}