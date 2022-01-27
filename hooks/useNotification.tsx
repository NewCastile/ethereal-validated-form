/** @format */

import {
	createContext,
	ReactElement,
	useContext,
	useMemo,
	useReducer,
} from "react"
import {
	NotificationContextProps,
	NotificationState,
	NotificationAction,
} from "../types/notification"

export const initialState: NotificationState = {
	notification: "",
	success: null,
}

const NotificationContext = createContext<NotificationContextProps>(
	{} as NotificationContextProps
)

const NotificationReducer = (
	state: NotificationState,
	action: NotificationAction
) => {
	switch (action.type) {
		case "SUCCESS":
			return {
				notification: action.payload.message,
				success: true,
			}
		case "ERROR": {
			return {
				notification: action.payload.message,
				success: false,
			}
		}
		case "RESET":
			return initialState
		default:
			return state
	}
}

export const NotificationProvider = ({
	init,
	children,
}: {
	init: NotificationState
	children: ReactElement
}) => {
	const [state, dispatch] = useReducer(NotificationReducer, init)

	const contextValue = useMemo(
		() => ({ notificationState: state, notificationDispatcher: dispatch }),
		[state]
	)

	return (
		<NotificationContext.Provider value={contextValue}>
			{children}
		</NotificationContext.Provider>
	)
}

export const useNotificationContext = () => {
	const context = useContext(NotificationContext)
	if (context === undefined) {
		throw new Error(
			"useNotificationContext must be used within a NotificationProvider"
		)
	}
	return context
}
