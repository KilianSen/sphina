import {Button} from "@heroui/react";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "../providers/theme-provider.tsx";

export function ThemeButton({className}: { className?: string }) {
	const {theme, setTheme} = useTheme();
	
	return (
		<Button
			radius={"full"}
			isIconOnly
			children={theme == "dark" ? <Sun/> : <Moon/>}
			onPress={() => setTheme(theme == "dark" ? "light" : "dark")}
			className={className}
		/>
	)
}