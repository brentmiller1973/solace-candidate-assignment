import db from '../../../db';
import { advocates, specialties, advocateSpecialties } from '../../../db/schema';
import { advocateData, specialtiesData } from '../../../db/seed/advocates';
import { logger } from '../../../lib/logger';
import { invalidateSpecialtiesCache } from '../../../lib/specialties';

export async function POST() {
  try {
    // Clear existing data (in reverse order due to foreign key constraints)
    await db.delete(advocateSpecialties);
    await db.delete(advocates);
    await db.delete(specialties);

    // Insert specialties first
    const insertedSpecialties = await db
      .insert(specialties)
      .values(specialtiesData.map((name) => ({ name })))
      .returning();

    logger.info(`Inserted ${insertedSpecialties.length} specialties`, {
      operation: 'database_seed',
      entity: 'specialties',
      count: insertedSpecialties.length,
    });

    // Insert advocates
    const insertedAdvocates = await db.insert(advocates).values(advocateData).returning();

    logger.info(`Inserted ${insertedAdvocates.length} advocates`, {
      operation: 'database_seed',
      entity: 'advocates',
      count: insertedAdvocates.length,
    });

    // Create random advocate-specialty relationships
    const advocateSpecialtyRelations = [];

    for (const advocate of insertedAdvocates) {
      // Each advocate gets 1-3 random specialties
      const specialtyCount = Math.floor(Math.random() * 3) + 1;
      const selectedSpecialties = new Set<number>();

      while (selectedSpecialties.size < specialtyCount) {
        const randomIndex = Math.floor(Math.random() * insertedSpecialties.length);
        selectedSpecialties.add(insertedSpecialties[randomIndex].id);
      }

      for (const specialtyId of Array.from(selectedSpecialties)) {
        advocateSpecialtyRelations.push({
          advocateId: advocate.id,
          specialtyId: specialtyId,
        });
      }
    }

    // Insert advocate-specialty relationships
    const insertedRelations = await db
      .insert(advocateSpecialties)
      .values(advocateSpecialtyRelations)
      .returning();

    logger.info(`Created ${insertedRelations.length} advocate-specialty relationships`, {
      operation: 'database_seed',
      entity: 'advocate_specialties',
      count: insertedRelations.length,
    });

    // Invalidate the specialties cache since we just updated the data
    await invalidateSpecialtiesCache();
    logger.info('Specialties cache invalidated', {
      operation: 'database_seed',
      entity: 'cache',
      action: 'invalidate',
    });

    return Response.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        advocates: insertedAdvocates.length,
        specialties: insertedSpecialties.length,
        relationships: insertedRelations.length,
      },
    });
  } catch (error) {
    logger.error('Database seeding failed', {
      operation: 'database_seed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return Response.json(
      {
        success: false,
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
