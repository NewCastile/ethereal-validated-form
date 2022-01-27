/** @format */

import type { NextPage } from "next"
import {
	initialState as initialCompletionState,
	CompletionProvider,
} from "../hooks/useCompletion"
import {
	initialState as initialNotificationState,
	NotificationProvider,
} from "../hooks/useNotification"
import {
	initialState as initialFormState,
	FormProvider,
} from "../hooks/useForm"
import {
	initialState as initialCodeState,
	CodeProvider,
} from "../hooks/useCode"
import Form from "../components/form"
import { Center, ChakraProvider } from "@chakra-ui/react"

const Home: NextPage = () => {
	return (
		<Center height={"100%"}>
			<ChakraProvider>
				<CompletionProvider init={initialCompletionState}>
					<FormProvider init={initialFormState}>
						<CodeProvider init={initialCodeState}>
							<NotificationProvider init={initialNotificationState}>
								<Form></Form>
							</NotificationProvider>
						</CodeProvider>
					</FormProvider>
				</CompletionProvider>
			</ChakraProvider>
		</Center>
	)
}

export default Home
