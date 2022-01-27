/** @format */
// ADD YUP SCHEMA
import { Select, Stack, Checkbox, Button, StackDivider } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useCodeContext } from "../../../hooks/useCode"
import { useCompletionContext } from "../../../hooks/useCompletion"
import { useFormContext } from "../../../hooks/useForm"
import { useNotificationContext } from "../../../hooks/useNotification"
import NotificationBox from "../../control/Notification"

export default function Second() {
	const { completionDispatcher } = useCompletionContext()
	const { codeDispatcher } = useCodeContext()
	const { notificationDispatcher } = useNotificationContext()
	const { formState, formDispatcher } = useFormContext()
	const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
	const countryRef = useRef<HTMLSelectElement>(null)
	const cityRef = useRef<HTMLSelectElement>(null)
	return (
		<Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
			<NotificationBox />
			<Select
				ref={countryRef}
				defaultValue={
					formState.country.length ? formState.country : "Venezuela"
				}>
				<option value='Venezuela'>Venezuela</option>
				<option value='Colombia'>Colombia</option>
				<option value='Argentina'>Argentina</option>
				<option value='México'>México</option>
				<option value='España'>España</option>
			</Select>
			<Select
				ref={cityRef}
				defaultValue={formState.city.length ? formState.city : "City A"}>
				<option value='City A'>City A</option>
				<option value='City B'>City B</option>
				<option value='City C'>City C</option>
				<option value='City D'>City D</option>
				<option value='City E'>City E</option>
			</Select>
			<Checkbox
				isChecked={termsAccepted}
				onChange={() => {
					setTermsAccepted((old) => !old)
				}}>
				Please accept our terms by clicking the checkbox
			</Checkbox>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				spacing={"20px"}
				divider={<StackDivider />}>
				<Button
					onClick={() => {
						completionDispatcher({ type: "RESET" })
						notificationDispatcher({ type: "RESET" })
						codeDispatcher({ type: "RESET" })
					}}>
					Go back
				</Button>
				<Button
					type='button'
					onClick={() => {
						if (countryRef.current && cityRef.current) {
							try {
								if (!termsAccepted)
									throw new Error("You have to accept our terms")
								formDispatcher({
									type: "LOAD_THIRD_FORM",
									payload: {
										country: countryRef.current.value,
										city: cityRef.current.value,
										accepted_terms: termsAccepted ? "ACCEPTED" : "NOT ACCEPTED",
									},
								})
								completionDispatcher({ type: "THIRD_STEP_COMPLETED" })
								notificationDispatcher({ type: "RESET" })
							} catch (err: any) {
								notificationDispatcher({
									type: "ERROR",
									payload: { message: decodeURI(err.message) },
								})
							}
						}
					}}>
					Next
				</Button>
			</Stack>
		</Stack>
	)
}
