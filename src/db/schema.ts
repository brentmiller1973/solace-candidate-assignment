import { sql, relations } from 'drizzle-orm';
import { pgTable, integer, text, serial, timestamp, bigint, primaryKey } from 'drizzle-orm/pg-core';

// Advocates table
export const advocates = pgTable('advocates', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  city: text('city').notNull(),
  degree: text('degree').notNull(),
  yearsOfExperience: integer('years_of_experience').notNull(),
  phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Specialties table
export const specialties = pgTable('specialties', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Junction table for advocates and specialties (many-to-many relationship)
export const advocateSpecialties = pgTable(
  'advocate_specialties',
  {
    advocateId: integer('advocate_id')
      .notNull()
      .references(() => advocates.id, { onDelete: 'cascade' }),
    specialtyId: integer('specialty_id')
      .notNull()
      .references(() => specialties.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.advocateId, table.specialtyId] }),
  }),
);

// Define relationships
export const advocatesRelations = relations(advocates, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
}));

export const specialtiesRelations = relations(specialties, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
}));

export const advocateSpecialtiesRelations = relations(advocateSpecialties, ({ one }) => ({
  advocate: one(advocates, {
    fields: [advocateSpecialties.advocateId],
    references: [advocates.id],
  }),
  specialty: one(specialties, {
    fields: [advocateSpecialties.specialtyId],
    references: [specialties.id],
  }),
}));
