import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

export const prisma = new PrismaClient();

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    logger.info('Successfully connected to the database.');
  } catch (error) {
    logger.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

checkDatabaseConnection();
