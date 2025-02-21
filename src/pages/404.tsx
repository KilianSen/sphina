import {ChevronDown, ChevronLeft, ChevronRight} from "lucide-react";

export function NotFound() {
	return (
		<div className={"w-full h-full flex flex-col justify-center items-center"}>
			<div className={"flex flex-col justify-center items-center"}>
				<div className={"flex flex-col text-center"}>
					<h3 className={"text-2xl"}>Sphina</h3>
					<h1 className={"text-9xl text-primary"}>404</h1>
				</div>
				<p>
					Page not found
				</p>
				<div className={"flex gap-2 items-start w-full justify-center text-xl"}>
					<div className={"flex"}><ChevronLeft/>Home</div>
					<div className={"flex flex-col"}>
						<a href={"/"}>Help</a>
						<ChevronDown/>
					</div>
					<div className={"flex"}>Wiki<ChevronRight/></div>
				</div>
			</div>
		</div>
	)
}