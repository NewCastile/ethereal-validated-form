/** @format */

import { NextApiRequest } from "next"

export interface EmailRequestBody {
	username: string
	email: string
	code: string
}

export interface EmailRequest extends NextApiRequest {
	body: EmailRequestBody
}

export interface EmailResponseBody {
	message: string
	success: boolean
}
