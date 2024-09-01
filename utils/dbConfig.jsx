import { neon } from '@neondatabase/serverless';
import * as schema from "@/utils/schema"
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon("postgresql://expensesdata_owner:gQX98SNcskAU@ep-shrill-shadow-a12sgqyk.ap-southeast-1.aws.neon.tech/expensesdata?sslmode=require");
export const db = drizzle(sql, { schema });