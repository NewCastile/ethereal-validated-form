/** @format */

import { ReactElement } from "react"
import { CompletionState, Step } from "../../types/completion"
import { useCompletionContext } from "../../hooks/useCompletion"
import { Stack, Text } from "@chakra-ui/react"
import First from "./options/First"
import Second from "./options/Second"
import Third from "./options/Third"
import Message from "../control/Message"
import Steps from "../control/Steps"

const createOptions = (
	components: ReactElement[],
	options: CompletionState
) => {
	const arrayedOptions = Array.from(Object.entries(options))
	const mappedOptions = arrayedOptions.map((entrie, entrieIdx) => {
		return { state: entrie[1] as Step, component: components[entrieIdx] }
	})
	return mappedOptions
}

export default function Form() {
	const { completionState } = useCompletionContext()
	const options = createOptions(
		[<First key={1} />, <Second key={2} />, <Third key={3} />],
		completionState
	)
	const SelectedForm = options
		.filter((option) => option.state === "NOT VALIDATED")
		?.map((option) => option.component)[0]
	return (
		<Stack {...ContainerStyles}>
			<Text fontWeight={"bold"} fontSize={"1.5em"}>
				Ethereal Validated Form
			</Text>
			<Stack width={"100%"} spacing={"20px"}>
				{SelectedForm ? SelectedForm : <Message />}
			</Stack>
			<Steps />
		</Stack>
	)
}

const ContainerStyles = {
	boxShadow: "1px 1px 20px rgba(0,0,0,40%)" as any,
	borderRadius: "10px" as any,
	bgColor: "white" as any,
	padding: "2em" as any,
	direction: "column" as any,
	justifyContent: "center" as any,
	alignItems: "center" as any,
	spacing: "30px" as any,
	width: "100%" as any,
	margin: "1em" as any,
	maxWidth: "450px" as any,
}
