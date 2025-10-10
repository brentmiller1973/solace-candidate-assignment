const { drizzle } = require('drizzle-orm/postgres-js');
const { migrate } = require('drizzle-orm/postgres-js/migrator');
const postgres = require('postgres');

// Simple structured logger for migration script
const logger = {
  info: (message, context = {}) => {
    // eslint-disable-next-line no-console
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'info',
        message,
        operation: 'database_migration',
        ...context,
      }),
    );
  },
  error: (message, context = {}) => {
    // eslint-disable-next-line no-console
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'error',
        message,
        operation: 'database_migration',
        ...context,
      }),
    );
  },
};

const runMigration = async () => {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

  logger.info('Starting database migration', {
    database_url: process.env.DATABASE_URL ? 'configured' : 'missing',
  });

  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(sql);
  await migrate(db, { migrationsFolder: 'drizzle' });
  await sql.end();
};

runMigration()
  .then(() => {
    logger.info('Database migration completed successfully');
    process.exit(0);
  })
  .catch((e) => {
    logger.error('Database migration failed', {
      error: e.message,
      stack: e.stack,
    });
    process.exit(1);
  });
