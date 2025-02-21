import {ReactNode} from "react";
import {HeroUIProvider} from "@heroui/react";
import {ThemeProvider} from "./theme-provider.tsx";

export default function RootProviders({children}: { children: ReactNode }) {
	return (
		<HeroUIProvider className={"w-full h-full"}>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</HeroUIProvider>
	)
}