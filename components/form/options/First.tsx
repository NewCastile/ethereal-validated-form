/** @format */

import { useRef } from "react"
import { Text, Button, Input, Stack, Link, Box } from "@chakra-ui/react"
import { useCompletionContext } from "../../../hooks/useCompletion"
import { useFormContext } from "../../../hooks/useForm"
import { useCodeContext } from "../../../hooks/useCode"
import { useNotificationContext } from "../../../hooks/useNotification"
import NotificationBox from "../../control/Notification"
import { EmailRequestBody, EmailResponseBody } from "../../../types/api"
import axios from "axios"
import { object as YupObject, string as YupString } from "yup"

export default function First() {
	const { formState, formDispatcher } = useFormContext()
	const {
		codeState: { code },
	} = useCodeContext()
	const { notificationDispatcher } = useNotificationContext()
	const { completionDispatcher } = useCompletionContext()
	const dispatch = {
		notificationAction: notificationDispatcher,
		completionAction: completionDispatcher,
		formAction: formDispatcher,
	}
	const emailRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	return (
		<>
			<Stack
				direction={"column"}
				alignItems={"flex-start"}
				justifyContent={"center"}
				spacing={"20px"}>
				<Text>
					Please register using{" "}
					<Link
						color={"#5da4ee"}
						textDecoration={"underline"}
						isExternal
						to={"https://ethereal.email/"}>
						Ethereal
					</Link>
				</Text>

				<Stack
					direction={"column"}
					alignItems={"flex-start"}
					justifyContent={"center"}
					width={"100%"}
					spacing={"20px"}>
					<Stack
						width={"100%"}
						direction={"row"}
						alignItems={"center"}
						justifyContent={"flex-start"}>
						<Text fontWeight={"bold"}>Example </Text>
						<Box
							as={"span"}
							cursor={"pointer"}
							onClick={() => {
								if (nameRef.current && emailRef.current) {
									nameRef.current.value = "Brooke Conroy"
									emailRef.current.value = "brooke.conroy70@ethereal.email"
								}
							}}>
							📝
						</Box>
					</Stack>
					<Text>Brooke Conroy</Text>
					<Text>brooke.conroy70@ethereal.email</Text>
				</Stack>
			</Stack>
			<Input
				ref={nameRef}
				type={"text"}
				placeholder={"username"}
				defaultValue={formState.username}></Input>
			<Input
				ref={emailRef}
				type={"email"}
				placeholder={"email@example.com"}
				defaultValue={formState.email}></Input>
			<Stack>
				<Button
					onClick={async () => {
						if (emailRef.current && nameRef.current) {
							const username = !nameRef.current.value.length
								? ""
								: nameRef.current.value
							const email = !emailRef.current.value.length
								? ""
								: emailRef.current.value
							nextButtonHandler(username, email, code, dispatch)
						}
					}}
					type='button'>
					Next
				</Button>
				<NotificationBox />
			</Stack>
		</>
	)
}

const nextButtonHandler = async (
	username: string,
	email: string,
	code: string,
	dispatch: any
) => {
	try {
		const yupValidation = await validateForm({ username, email })
		if (!yupValidation.success) throw new Error(yupValidation.message as string)
		dispatch.notificationAction({
			type: "SUCCESS",
			payload: { message: yupValidation.message },
		})
		const res = await sendEmail({
			username,
			email,
			code,
		})
		if (!res.success) {
			throw new Error("Something went wrong while sending email")
		}
		dispatch.formAction({
			type: "LOAD_FIRST_FORM",
			payload: {
				email,
				username,
			},
		})
		dispatch.completionAction({
			type: "FIRST_STEP_COMPLETED",
		})
		dispatch.notificationAction({
			type: "SUCCESS",
			payload: { message: res.message },
		})
	} catch (err: any) {
		dispatch.notificationAction({
			type: "ERROR",
			payload: { message: decodeURI(err) },
		})
	}
}

const formSchema = YupObject({
	username: YupString().required("missing username field"),
	email: YupString()
		.matches(/@ethereal.email$/, {
			message: "must be an ethereal email account",
		})
		.required("missing email field"),
})

const validateForm = async ({
	username,
	email,
}: {
	username: string
	email: string
}): Promise<{ success: boolean; message: string }> => {
	return formSchema
		.validate(
			{
				username: username,
				email: email,
			},
			{ abortEarly: false }
		)
		.then(() => ({
			message: `Good job 👍 please wait we are sending you an email`,
			success: true,
		}))
		.catch((err: any) => {
			const errorMessage: string = err.errors.reduce(
				(prev: string, curr: string) => prev + " and " + curr
			)
			return {
				message: decodeURI(errorMessage),
				success: false,
			}
		})
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
