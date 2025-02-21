import {Card, CardBody, Divider, Input, Slider, Switch, Tab, Tabs, Textarea} from "@heroui/react";
import {
	ComponentPropsWithoutRef,
	Key,
	ReactElement,
	useState
} from "react";
import {Conditional} from "../utils/conditional.tsx";
import 'maplibre-gl/dist/maplibre-gl.css';
import {Map} from "@vis.gl/react-maplibre";
import {HeartHandshake, MapPin, Plus, ScrollText} from "lucide-react";
import {useMultiState} from "../utils/useMultiState.ts";

function GeneralSection() {
	return (
		<Card>
			<CardBody>
				<div className={"flex flex-col gap-2"}>
					<h1 className={"text-2xl"}>General</h1>
					<div className={"flex flex-col gap-2 px-2"}>
						<div>
							<Input
								labelPlacement={"outside"}
								label={"Event Name"}
								type="text" placeholder="Bowling Trip"/>
						</div>
						<div>
							<Textarea
								labelPlacement={"outside"}
								label={"Event Description"}
								placeholder={"Enter a short description for the event"}
							/>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	)
}

const Modes: Record<string, {
	icon: ReactElement,
	description: string,
}> = {
	location: {
		icon: <MapPin/>,
		description: "You select a location for the event"
	},
	vote: {
		icon: <HeartHandshake/>,
		description: "You supply locations for the guests to vote on"
	},
	any: {
		icon: <ScrollText/>,
		description: "You leave the location open for the guests to decide"
	}
}

type LocationSettings = {
	mode: keyof typeof Modes,
	allowGuestSuggestions: boolean,
	multiLocation: boolean,
}

function useES<type, key extends keyof type, props>(key: key, val: type[key], update: (key: key, value: type[key]) => void, mapping: {value: keyof props, onValueChange: keyof props}) {
	return {
		[mapping.value]: val,
		[mapping.onValueChange]: (val: type[key]) => {
			update(key, val);
		}
	};
}

function useSwitchState<K extends keyof LocationSettings>(key: K, val: LocationSettings[K], update: (key: K, value: LocationSettings[K]) => void) {
	return useES<LocationSettings, K, ComponentPropsWithoutRef<typeof Switch>>(
		key, val, update, { value: "isSelected", onValueChange: "onValueChange" }
	);
}

function LocationSection() {
	
	const [state, update] = useMultiState({
		mode: "location",
		allowGuestSuggestions: false,
		multiLocation: false
	} as LocationSettings)
	
	function useSS<K extends keyof LocationSettings>(key: K) {
		return useSwitchState(key, state[key], (key, value) => update(key, value))
	}
	
	return (<Card>
		<CardBody>
			<div className={"flex flex-col gap-2"}>
				<h1 className={"text-2xl"}>Location</h1>
				<div className={"flex flex-col gap-2 px-2"}>
					<div className={"flex gap-2 justify-between items-center"}>
						<p className={"text-xl"}>Mode</p>
						<Tabs selectedKey={state.mode} onSelectionChange={key => update("mode", key as string)} aria-label={"Location Mode"} placement={"top"} title={"Test"}>
							{Object.entries(Modes).map(([key, {icon}]) => (
								<Tab key={key as Key} title={<div className={"flex gap-2"}>{icon}{key}</div>}/>
							))}
						</Tabs>
					</div>
					<Card className={"p-2 bg-content2 shadow-xs"} radius={"sm"}>
						{Modes[state.mode].description}
					</Card>
					<div className={"flex flex-col gap-2"}>
						<p className={"text-xl"}>Options</p>
						<div className={"grid grid-cols-3 gap-2"}>
							<Switch {...useSS("allowGuestSuggestions")}>Allow guests to suggest to vote on locations</Switch>
							<Switch {...useSS("multiLocation")}>Multi Location</Switch>
						</div>
					</div>
					
					<Divider/>
					<div className={"flex gap-2"}>
						<Map
							initialViewState={{
								longitude: -100,
								latitude: 40,
								zoom: 3.5
							}}
							style={{width: 1000, height: 400}}
							mapStyle={"https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"}
						/>
						<Conditional condition={state.multiLocation}>
							<Card className={"grow p-2 flex gap-2"} isBlurred>
								<Card className={"p-2"}>
									<div className={"flex items-center"}>
										<div className={"px-4 stroke-content4"}>
											<MapPin/>
										</div>
										<div className={"text-content4"}>
											<p className={"text-3xl"}>Location</p>
											<Input size={"sm"} label={"Description"} placeholder={"Parking"}/>
										</div>
									</div>
								</Card>
								<Card>
									2
								</Card>
								<Card className={"p-2"}>
									<div className={"flex items-center"}>
										<div className={"px-4 stroke-content4"}>
											<Plus/>
										</div>
										<Divider orientation={"vertical"}/>
										<div className={"text-content4"}>
											<p className={"text-3xl"}>
												Add Location
											</p>
											<p>
												Click to add a new location
											</p>
										</div>
									</div>
								</Card>
							</Card>
						</Conditional>
						<Conditional condition={!state.multiLocation}>
							<Card className={"grow"} isBlurred>
								<p className={"text-3xl text-center"}>
									Locate
								</p>
							</Card>
						</Conditional>
					</div>
					<Divider/>
					
					
				</div>
			</div>
		</CardBody>
	</Card>)
}

function DnTSection() {
	type DnTState = {
		isMultiDay: boolean,
		allowDateVoting: boolean,
		range: boolean,
		rangeValue: [number, number],
	}
	const [dntState, setDnTState] = useState<DnTState>({rangeValue: [2, 4]} as DnTState)
	
	function updateDnTStat<X extends keyof DnTState>(key: X, value: DnTState[X]) {
		setDnTState({
			...dntState,
			[key]: value
		})
	}
	
	return (
		<Card>
			<CardBody>
				<div className={"flex flex-col gap-2"}>
					<h1 className={"text-2xl"}>Date & Time</h1>
					<div className={"flex flex-col gap-2 px-2"}>
						<Switch onChange={(v) => updateDnTStat("isMultiDay", v.target.checked)}>
							This Event takes more than one day?
						</Switch>
						<Conditional condition={dntState.isMultiDay}>
							<Divider/>
							<div className={"flex gap-2"}>
								<Conditional condition={!dntState.range}>
									<Input type="number" placeholder="Number of days" min={1} step={1} max={31}
									       labelPlacement={"outside"} label={"Number of days the Event takes"}/>
								</Conditional>
								<Conditional condition={dntState.range}>
									<div className={"grow"}>
										<Slider defaultValue={dntState.rangeValue} minValue={1} maxValue={31} step={1}
										        onChange={(value) => {
											        updateDnTStat("rangeValue", value as [number, number])
										        }} label={"Select the range of days the event might take"} hideValue/>
										<p>
											Between {dntState.rangeValue[0]} and {dntState.rangeValue[1]} days
										</p>
									</div>
								</Conditional>
								<Switch onChange={(v) => updateDnTStat("range", v.target.checked)}>Range of
									days</Switch>
							</div>
						</Conditional>
						<Divider/>
						<div className={"flex justify-evenly gap-5"}>
							<Card className={"grow"}>
								<CardBody>
									<h1>Hell</h1>
								</CardBody>
							</Card>
							<Card className={"grow"}>
								<CardBody>
									123
								</CardBody>
							</Card>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	)
}

export function NewEvent() {
	return (
		<div className={"w-full h-full flex flex-col items-center"}>
			<div className={"w-3/4 flex flex-col gap-2"}>
				<h1 className={"text-2xl"}>New Event</h1>
				<form className={"flex flex-col gap-5"}>
					<GeneralSection/>
					<DnTSection/>
					<LocationSection/>
				</form>
			</div>
		</div>
	);
}