/** @format */

import { Box, Circle, Stack } from "@chakra-ui/react"
import { useCompletionContext } from "../../hooks/useCompletion"

export default function Steps() {
	const { completionState } = useCompletionContext()
	return (
		<Stack
			direction={"row"}
			justifyContent={"center"}
			alignItems={"center"}
			spacing={"30px"}
			divider={
				<Box border={"none"} fontWeight={"bold"} color={"gray.400"}>
					{">"}
				</Box>
			}>
			{Array.from(Object.values(completionState)).map((value, valueIdx) => (
				<Circle
					key={valueIdx}
					border={"4px solid"}
					borderColor={"blue.400"}
					size={"3em"}>
					<Circle
						key={valueIdx + 1}
						size={"2em"}
						border={"2px solid"}
						fontWeight={"bold"}
						color={value === "NOT VALIDATED" ? "gray.400" : "white"}
						bgColor={value === "NOT VALIDATED" ? "white" : "blue.400"}
						borderColor={"blue.400"}>
						{valueIdx + 1}
					</Circle>
				</Circle>
			))}
		</Stack>
	)
}
