/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next"
import { EmailRequest, EmailResponseBody } from "../../types/api"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: `${process.env.SENDER_USER_EMAIL ?? "kay.spinka@ethereal.email"}`,
		pass: `${process.env.SENDER_USER_PASSWORD ?? "AMGRjgfYynH2h1waSp"}`,
	},
	tls: { rejectUnauthorized: false }
})

export default function handler(
	req: EmailRequest,
	res: NextApiResponse<EmailResponseBody>
) {
	if (req.method === "POST") {
		const { username, code, email } = req.body
		const mailData = {
			from: `${process.env.SENDER_USER_NAME} <${process.env.SENDER_USER_EMAIL}>`, // sender address
			to: `${username} <${email}>`, // list of receivers example: dale.stokes58@ethereal.email
			subject: "Sending Email using Node.js",
			text: "That was easy!",
			html: `<h1>Hey there ${username}! </h1>
         <h4> This is our first message sent with Nodemailer<h4/>
         <p>your code is ${code}</p>
         `,
		}

		transporter.sendMail(mailData, (err, info) => {
			if (err) {
				return res
					.status(400)
					.json({ message: `An error has ocurred ${err}`, success: false })
			}
			return res.status(200).json({
				// Preview only available when sending through an Ethereal account
				message: `Mail send! Please visit the following page: ${nodemailer.getTestMessageUrl(
					info
				)}`,
				success: true,
			})
		})
	} else {
		return res.status(200).json({
			message: `You're making a GET request, Hello from GET request`,
			success: true,
		})
	}
}
