import { unstable_cache } from 'next/cache';
import db from '../db';
import { specialties } from '../db/schema';

async function fetchSpecialtiesFromDatabase(): Promise<string[]> {
  try {
    const dbSpecialties = await db
      .select({
        name: specialties.name,
      })
      .from(specialties)
      .orderBy(specialties.name);

    return dbSpecialties.map((s) => s.name);
  } catch (error) {
    throw new Error('Unable to load specialties. Please try again later.');
  }
}

export const getSpecialties = unstable_cache(fetchSpecialtiesFromDatabase, ['specialties'], {
  revalidate: 3600,
  tags: ['specialties'],
});

export async function invalidateSpecialtiesCache() {
  const { revalidateTag } = await import('next/cache');
  revalidateTag('specialties');
}
