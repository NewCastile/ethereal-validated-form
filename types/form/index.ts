/** @format */

import React from "react"

export interface FormState {
	//all form fields
	username: string
	country: string
	city: string
	email: string
	accepted_terms: "ACCEPTED" | "NOT ACCEPTED"
	validation_code: string
}

export interface FirstFormCompletionAction {
	type: "LOAD_FIRST_FORM"
	payload: {
		username: string
		email: string
	}
}

export interface SecondFormCompletionAction {
	type: "LOAD_SECOND_FORM"
	payload: {
		validation_code: string
	}
}

export interface ThirdFormCompletionAction {
	type: "LOAD_THIRD_FORM"
	payload: {
		country: string
		city: string
		accepted_terms: FormState["accepted_terms"]
	}
}

export interface ResetFormAction {
	type: "RESET"
}

export type FormAction =
	| FirstFormCompletionAction
	| SecondFormCompletionAction
	| ThirdFormCompletionAction
	| ResetFormAction

export interface FormContextProps {
	formState: FormState
	formDispatcher: React.Dispatch<FormAction>
}
