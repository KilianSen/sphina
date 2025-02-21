import {ReactNode} from "react";
import {ChildOutlet} from "../utils/useChildrenOrOutlet.tsx";
import {ThemeButton} from "../components/ThemeButton.tsx";
import {Button, Image} from "@heroui/react";
import {useClickLink} from "../utils/useClickLink.ts";
import {LoginAvatar} from "../components/loginAvatar.tsx";

export function BaseLayout({children}: { children?: ReactNode }) {
	return (
		<div className={"w-full min-h-screen h-full"}>
			<div className={"flex gap-5 w-full justify-between p-7 px-24"}>
				<div className={"flex gap-2 items-center"}>
					<Image src={"./Sphina.svg"} width={50} height={50}/>
					<h1 className={"text-2xl"}>Sphina</h1>
				</div>
				<div className={"flex items-center gap-5"}>
					<Button variant={"light"} color={"primary"} className={"text-xl"} {...useClickLink("/")}>Home</Button>
					<Button variant={"light"} color={"primary"} className={"text-xl"} {...useClickLink("a")}>Get Started</Button>
				</div>
				<div className={"flex gap-5"}>
					<LoginAvatar/>
					<ThemeButton/>
				</div>
			</div>
			<div className={"h-full"}>
				<ChildOutlet children={children}/>
			</div>
		</div>
	)
}