/** @format */

import {
	createContext,
	ReactElement,
	useContext,
	useMemo,
	useReducer,
} from "react"
import { FormState, FormAction, FormContextProps } from "../types/form"

export const initialState = {
	username: "",
	country: "",
	city: "",
	email: "",
	accepted_terms: "NOT ACCEPTED" as const,
	validation_code: "",
}

const FormContext = createContext<FormContextProps>({
	formState: initialState,
	formDispatcher: () => {},
})

const FormReducer = function (state: FormState, action: FormAction) {
	switch (action.type) {
		case "LOAD_FIRST_FORM":
			return {
				...state,
				username: action.payload.username,
				email: action.payload.email,
			}
		case "LOAD_SECOND_FORM":
			return {
				...state,
				validation_code: action.payload.validation_code,
			}
		case "LOAD_THIRD_FORM":
			return {
				...state,
				accepted_terms: action.payload.accepted_terms,
				country: action.payload.country,
				city: action.payload.city,
			}
		case "RESET":
			return initialState
		default:
			return state
	}
}

export const FormProvider = ({
	init,
	children,
}: {
	init: FormState
	children: ReactElement
}) => {
	const [state, dispatcher] = useReducer(FormReducer, init)

	const contextValue = useMemo(
		() => ({ formState: state, formDispatcher: dispatcher }),
		[state]
	)

	return (
		<FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
	)
}

export const useFormContext = () => {
	const context = useContext(FormContext)
	if (context === undefined) {
		throw new Error("useFormContext must be used within a FormProvider")
	}
	return context
}
