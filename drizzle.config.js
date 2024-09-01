import { Config, defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://expensesdata_owner:gQX98SNcskAU@ep-shrill-shadow-a12sgqyk.ap-southeast-1.aws.neon.tech/expensesdata?sslmode=require",
  },
  verbose: true,
  strict: true,
})