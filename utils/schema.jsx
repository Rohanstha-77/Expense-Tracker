import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

const Bugets = pgTable(
   "bugets",{
        id: serial("id").primaryKey(),
        name: varchar('name').notNull(),
        amount: numeric('amount').notNull(),
        icon: varchar('icon'),
        createdBy: varchar('createdBy').notNull(),
});

const expenses = pgTable("expenses",{
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount").notNull(),
    budgetId: integer("budgetId").references(()=>Bugets.id),
    createdAt: varchar("createdAt").notNull()
})

export default Bugets;
export { expenses };