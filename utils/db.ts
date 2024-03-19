// import { PrismaClient } from "@prisma/client/edge"
import { Pool, neonConfig } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import ws from "ws"
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

declare global {
	var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient({ adapter })
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient({ adapter })
	}
	prisma = global.prisma
}

export default prisma
