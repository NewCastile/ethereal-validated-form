/** @format */

import { useRef } from "react"
import { Text, Button, Input, Stack } from "@chakra-ui/react"
import axios from "axios"
import * as yup from "yup"
import { useCompletionContext } from "../../../hooks/useCompletion"
import { useFormContext } from "../../../hooks/useForm"
import { useCodeContext } from "../../../hooks/useCode"
import { useNotificationContext } from "../../../hooks/useNotification"
import NotificationBox from "../../control/Notification"
import { EmailRequestBody, EmailResponseBody } from "../../../types/api"

interface ResponseBody {
	message: string
	success: boolean
}

const formSchema = yup.object({
	username: yup.string().required("missing username field"),
	email: yup
		.string()
		.matches(/@ethereal.email$/, {
			message: "must be an ethereal email account",
		})
		.required("missing email field"),
})

export default function First() {
	const { formState, formDispatcher } = useFormContext()
	const { codeState } = useCodeContext()
	const { notificationDispatcher } = useNotificationContext()
	const { completionDispatcher } = useCompletionContext()
	const emailRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	return (
		<Stack spacing={"20px"}>
			<Stack
				direction={"column"}
				alignItems={"flex-start"}
				justifyContent={"center"}
				spacing={"20px"}>
				<Text>Please register using Ethereal</Text>
				<Text>Example: </Text>
				<Text>Brooke Conroy</Text>
				<Text>brooke.conroy70@ethereal.email</Text>
			</Stack>
			<Input
				ref={nameRef}
				type={"text"}
				placeholder={"username"}
				defaultValue={formState.username}></Input>
			<Input
				width={"500px"}
				ref={emailRef}
				type={"email"}
				placeholder={"email@example.com"}
				defaultValue={formState.email}></Input>
			<Stack>
				<Button
					onClick={async () => {
						if (emailRef.current && nameRef.current) {
							const username = !nameRef.current.value.length
								? undefined
								: nameRef.current.value
							const email = !emailRef.current.value.length
								? undefined
								: emailRef.current.value
							try {
								const yupValidation = await formSchema
									.validate(
										{
											username: username,
											email: email,
										},
										{ abortEarly: false }
									)
									.then(() => ({
										message: `Good job 👍 please wait we are sending you an email`,
										validated: true,
									}))
									.catch((err) => {
										const errorMessage: string = err.errors.reduce(
											(prev: string, curr: string) => prev + " and " + curr
										)
										return {
											message: decodeURI(errorMessage),
											validated: false,
										}
									})

								if (!yupValidation.validated)
									throw new Error(yupValidation.message as string)
								notificationDispatcher({
									type: "SUCCESS",
									payload: { message: yupValidation.message },
								})
								const res = await sendEmail({
									username: username as string,
									email: email as string,
									code: codeState.code,
								})
								if (!res.success) {
									throw new Error("Something went wrong while sending email")
								}
								formDispatcher({
									type: "LOAD_FIRST_FORM",
									payload: {
										email: emailRef.current.value,
										username: nameRef.current.value,
									},
								})
								completionDispatcher({
									type: "FIRST_STEP_COMPLETED",
								})
								notificationDispatcher({
									type: "SUCCESS",
									payload: { message: res.message },
								})
							} catch (err: any) {
								notificationDispatcher({
									type: "ERROR",
									payload: { message: decodeURI(err) },
								})
							}
						}
					}}
					type='button'>
					Next
				</Button>
				<NotificationBox />
			</Stack>
		</Stack>
	)
}

const sendEmail = async ({ username, email, code }: EmailRequestBody) => {
	try {
		const res = await axios.post<EmailResponseBody>("/api/send-email", {
			username,
			email,
			code,
		})
		return res.data
	} catch (err: any) {
		if (err.response) {
			return {
				message: JSON.stringify(err.response.data),
				success: false,
			}
		} else {
			return {
				message: JSON.stringify(err.message),
				success: false,
			}
		}
	}
}
