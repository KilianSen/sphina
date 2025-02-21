import {useState} from "react";

// useMultiState is a custom hook that returns a hook that can be used like useMState(key<keyof T>, value:T[X], default?:X)
export function useMultiState<T>(initialState: T) {
	const [internalState, setInternalState] = useState<T>(initialState)
	
	function setState(key: keyof T, value: T[keyof T]) {
		setInternalState({...internalState, [key]: value})
	}
	
	return [internalState, setState] as const
}
