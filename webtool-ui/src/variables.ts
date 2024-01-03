import * as dotenv from 'dotenv'

dotenv.config();
export const server = process.env.SERVER?process.env.SERVER:"http://localhost:3000"