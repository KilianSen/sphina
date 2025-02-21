import {Avatar, Button, cn} from "@heroui/react";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useHover} from "../utils/useHover.ts";

export function LoginAvatar({className}: { className?: string }) {
	const h1 = useHover()
	const h2 = useHover()
	
	const [isActive, setIsActive] = useState(false)
	
	useEffect(() => {
		let tO: null | number = null
		
		if (!h1.hovered && !h2.hovered) {
			tO = setTimeout(() => {
				setIsActive(false)
			}, 100)
		} else {
			setIsActive(true)
		}
		
		return () => {
			if (tO) clearTimeout(tO)
		}
	}, [h1.hovered, h2.hovered])
	
	return (
		<div className={"relative"} {...h1.bind}>
			<div className={"flex flex-row-reverse rounded-full h-min transition-all duration-200"}>
				<Avatar className={cn(className)}/>
			</div>
			<div className={"absolute left-0 top-0 -translate-x-full"}>
				<AnimatePresence>
					{isActive && <motion.div
                        initial={{scaleX: 0, translateX: 100, zIndex: -100}}
                        animate={{scaleX: 1, translateX: 0, zIndex: 0}}
                        exit={{scaleX: 0, translateX: 100, zIndex: -100}}
                        transition={{duration: 0.2, type: "linear"}}
                        className={"pr-2 flex gap-2"}
						{...h2.bind}
                    >
                        <Button radius={"full"}>Sign In</Button>
                        <Button radius={"full"}>Sign Up</Button>
                    </motion.div>}
				</AnimatePresence>
			</div>
		</div>
	)
}