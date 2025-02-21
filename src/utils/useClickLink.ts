import {useNavigate} from "react-router";

type ClickLink = {
	onPress: () => void;
}

export function useClickLink(href: string): ClickLink {
	const navigate = useNavigate();
	return {onPress: () => navigate(href)};
}