/** @format */

import { Button, Input, Stack, StackDivider } from "@chakra-ui/react"
import { useRef } from "react"
import { useCodeContext } from "../../../hooks/useCode"
import { useCompletionContext } from "../../../hooks/useCompletion"
import { useFormContext } from "../../../hooks/useForm"
import { useNotificationContext } from "../../../hooks/useNotification"
import NotificationBox from "../../control/Notification"

export default function Second() {
	const { formDispatcher } = useFormContext()
	const { completionDispatcher } = useCompletionContext()
	const { notificationDispatcher } = useNotificationContext()
	const { codeState, codeDispatcher } = useCodeContext()
	const codeRef = useRef<HTMLInputElement>(null)

	return (
		<>
			<NotificationBox />
			<Input ref={codeRef} type={"text"}></Input>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				spacing={"20px"}
				divider={<StackDivider />}>
				<Button
					flexBasis={"25%"}
					onClick={() => {
						completionDispatcher({ type: "INVALIDATE_CODE" })
						codeDispatcher({ type: "RESET" })
						notificationDispatcher({ type: "RESET" })
					}}>
					Go back
				</Button>
				<Button
					flexBasis={"25%"}
					onClick={() => {
						if (codeRef.current) {
							if (codeRef.current.value === codeState.code) {
								formDispatcher({
									type: "LOAD_SECOND_FORM",
									payload: { validation_code: codeRef.current.value },
								})
								completionDispatcher({ type: "SECOND_STEP_COMPLETED" })
								return notificationDispatcher({
									type: "SUCCESS",
									payload: {
										message:
											"Now complete the following form to end the process",
									},
								})
							}
							completionDispatcher({ type: "INVALIDATE_CODE" })
							notificationDispatcher({
								type: "ERROR",
								payload: { message: "Wrong validation code" },
							})
							codeDispatcher({ type: "RESET" })
						}
					}}
					type='button'>
					Next
				</Button>
			</Stack>
		</>
	)
}
