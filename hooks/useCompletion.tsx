/** @format */

import {
	createContext,
	ReactElement,
	useContext,
	useMemo,
	useReducer,
} from "react"
import {
	CompletionState,
	CompletionAction,
	CompletionContextProps,
	Step,
} from "../types/completion"

export const initialState: CompletionState = {
	first: "NOT VALIDATED",
	second: "NOT VALIDATED",
	third: "NOT VALIDATED",
}

const CompletionContext = createContext<CompletionContextProps>(
	{} as CompletionContextProps
)

const CompletionReducer = function (
	state: CompletionState,
	action: CompletionAction
) {
	switch (action.type) {
		case "FIRST_STEP_COMPLETED":
			return {
				...state,
				first: "VALIDATED" as Step,
			}
		case "SECOND_STEP_COMPLETED":
			return {
				...state,
				second: "VALIDATED" as Step,
			}
		case "THIRD_STEP_COMPLETED":
			return {
				...state,
				third: "VALIDATED" as Step,
			}
		case "INVALIDATE_CODE":
			return {
				...state,
				first: "NOT VALIDATED" as Step,
			}
		case "RESET": {
			return initialState
		}

		default:
			return state
	}
}

export const CompletionProvider = ({
	init,
	children,
}: {
	init: CompletionState
	children: ReactElement
}) => {
	const [state, dispatcher] = useReducer(CompletionReducer, init)

	const contextValue = useMemo(
		() => ({ completionState: state, completionDispatcher: dispatcher }),
		[state]
	)

	return (
		<CompletionContext.Provider value={contextValue}>
			{children}
		</CompletionContext.Provider>
	)
}

export const useCompletionContext = () => {
	const context = useContext(CompletionContext)
	if (context === undefined) {
		throw new Error(
			"useCompletionContext must be used within a CompletionProvider"
		)
	}
	return context
}
