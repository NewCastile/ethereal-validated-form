/** @format */

import { Box, Link, Stack, Text } from "@chakra-ui/react"
import { useNotificationContext } from "../../hooks/useNotification"

export default function NotificationBox() {
	const { notificationState } = useNotificationContext()
	const { notification, success } = notificationState
	const links = notification.split(" ").filter((word) => word.match(/^http/))
	return (
		<>
			{success ? (
				<Box color={"teal"} width={"60ch"}>
					<Text fontWeight={"bold"}>{notification.split("http")[0]}</Text>
					{links.length >= 1 ? (
						<Stack>
							{links.map((link, linkIdx) => (
								<Link isExternal href={link} key={linkIdx}>
									{link}
								</Link>
							))}
						</Stack>
					) : null}
				</Box>
			) : success === false ? (
				<Box color={"tomato"} width={"60ch"}>
					<Text fontWeight={"bold"}>{notification.split("http")[0]}</Text>
					{links.length >= 1 ? (
						<Stack>
							{links.map((link, linkIdx) => (
								<Link isExternal href={link} key={linkIdx}>
									{link}
								</Link>
							))}
						</Stack>
					) : null}
				</Box>
			) : null}
		</>
	)
}
