import db from '../../../db';
import { advocates, specialties, advocateSpecialties } from '../../../db/schema';
import { eq, count, like, ilike, and, or, gte, inArray } from 'drizzle-orm';
import { Advocate, AdvocateRow } from '../../../models/advocate';
import { logger } from '../../../lib/logger';

const extractPaginationParams = (searchParams: URLSearchParams) => {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '25');
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const extractSearchFilters = (searchParams: URLSearchParams) => {
  return {
    basicSearchTerm: searchParams.get('search') || '',
    nameFilter: searchParams.get('name') || '',
    locationFilter: searchParams.get('location') || '',
    specialtyFilters: searchParams.getAll('specialty'),
    experienceFilter: searchParams.get('experience') || '',
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { page, limit, offset } = extractPaginationParams(searchParams);
  const { basicSearchTerm, nameFilter, locationFilter, specialtyFilters, experienceFilter } =
    extractSearchFilters(searchParams);

  const buildBasicSearchCondition = (searchTerm: string) => {
    if (!searchTerm) return null;
    return or(
      ilike(advocates.firstName, `%${searchTerm}%`),
      ilike(advocates.lastName, `%${searchTerm}%`),
      ilike(advocates.city, `%${searchTerm}%`),
      ilike(advocates.degree, `%${searchTerm}%`),
    );
  };

  const buildNameFilterCondition = (nameFilter: string) => {
    if (!nameFilter) return null;
    return or(
      ilike(advocates.firstName, `%${nameFilter}%`),
      ilike(advocates.lastName, `%${nameFilter}%`),
    );
  };

  const buildLocationFilterCondition = (locationFilter: string) => {
    if (!locationFilter) return null;
    return ilike(advocates.city, `%${locationFilter}%`);
  };

  const buildExperienceFilterCondition = (experienceFilter: string) => {
    if (!experienceFilter) return null;
    const minExperience = parseInt(experienceFilter);
    return !isNaN(minExperience) ? gte(advocates.yearsOfExperience, minExperience) : null;
  };

  const buildSpecialtyAndFilterSubquery = async (specialtyFilters: string[]) => {
    if (!specialtyFilters.length) return null;

    const matchingAdvocateIds = await db
      .select({ advocateId: advocateSpecialties.advocateId })
      .from(advocateSpecialties)
      .leftJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
      .where(or(...specialtyFilters.map((specialty) => ilike(specialties.name, `%${specialty}%`))))
      .groupBy(advocateSpecialties.advocateId)
      .having(eq(count(), specialtyFilters.length));

    return matchingAdvocateIds.map((row) => row.advocateId);
  };

  try {
    const advocateFilterConditions = [
      buildBasicSearchCondition(basicSearchTerm),
      buildNameFilterCondition(nameFilter),
      buildLocationFilterCondition(locationFilter),
      buildExperienceFilterCondition(experienceFilter),
    ].filter((condition): condition is NonNullable<typeof condition> => condition !== null);

    const specialtyMatchingAdvocateIds = await buildSpecialtyAndFilterSubquery(specialtyFilters);

    if (specialtyMatchingAdvocateIds && specialtyMatchingAdvocateIds.length === 0) {
      return Response.json({
        data: [],
        pagination: {
          page,
          limit,
          totalCount: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      });
    }

    if (specialtyMatchingAdvocateIds) {
      advocateFilterConditions.push(inArray(advocates.id, specialtyMatchingAdvocateIds));
    }

    const completeWhereClause =
      advocateFilterConditions.length > 0 ? and(...advocateFilterConditions) : undefined;

    const getTotalAdvocateCount = async (whereClause: any) => {
      const countQuery = whereClause
        ? db.select({ count: count() }).from(advocates).where(whereClause)
        : db.select({ count: count() }).from(advocates);
      const result = await countQuery;
      return result[0]?.count || 0;
    };

    const totalCount = await getTotalAdvocateCount(completeWhereClause);

    const buildAdvocatesQuery = () => {
      return db
        .select({
          id: advocates.id,
          firstName: advocates.firstName,
          lastName: advocates.lastName,
          city: advocates.city,
          degree: advocates.degree,
          yearsOfExperience: advocates.yearsOfExperience,
          phoneNumber: advocates.phoneNumber,
          createdAt: advocates.createdAt,
          updatedAt: advocates.updatedAt,
          specialty: {
            id: specialties.id,
            name: specialties.name,
          },
        })
        .from(advocates)
        .leftJoin(advocateSpecialties, eq(advocates.id, advocateSpecialties.advocateId))
        .leftJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id));
    };

    const executeAdvocatesQuery = async (whereClause: any) => {
      const query = buildAdvocatesQuery();
      return whereClause
        ? await query.where(whereClause).limit(limit).offset(offset)
        : await query.limit(limit).offset(offset);
    };

    const advocatesWithSpecialties = await executeAdvocatesQuery(completeWhereClause);

    const groupAdvocatesByIdWithSpecialties = (rows: AdvocateRow[]): Advocate[] => {
      const advocatesMap = new Map<number, Advocate>();

      for (const row of rows) {
        const advocateId = row.id;

        if (!advocatesMap.has(advocateId)) {
          advocatesMap.set(advocateId, {
            id: row.id,
            firstName: row.firstName,
            lastName: row.lastName,
            city: row.city,
            degree: row.degree,
            yearsOfExperience: row.yearsOfExperience,
            phoneNumber: row.phoneNumber,
            createdAt: row.createdAt || undefined,
            updatedAt: row.updatedAt || undefined,
            specialties: [],
          });
        }

        if (row.specialty && row.specialty.name) {
          advocatesMap.get(advocateId)!.specialties.push(row.specialty.name);
        }
      }

      return Array.from(advocatesMap.values());
    };

    const advocatesData = groupAdvocatesByIdWithSpecialties(advocatesWithSpecialties);

    const calculatePaginationMetadata = (totalCount: number, page: number, limit: number) => {
      const totalPages = Math.ceil(totalCount / limit);
      return {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    };

    const paginationMetadata = calculatePaginationMetadata(totalCount, page, limit);

    return Response.json({
      data: advocatesData,
      pagination: paginationMetadata,
    });
  } catch (error) {
    logger.error('Database query failed in advocates API', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      endpoint: '/api/advocates',
      filters: { basicSearchTerm, nameFilter, locationFilter, specialtyFilters, experienceFilter },
      pagination: { page, limit, offset },
    });

    const createErrorResponse = (error: unknown) => {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const errorDetails = isDevelopment && error instanceof Error ? error.message : undefined;

      return Response.json(
        {
          error: 'Internal Server Error',
          message: 'Unable to retrieve advocates at this time. Please try again later.',
          details: errorDetails,
        },
        { status: 500 },
      );
    };

    return createErrorResponse(error);
  }
}
