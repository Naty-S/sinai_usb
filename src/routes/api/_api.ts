import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (request: Request, data?: Record<string, unknown>) => {
  
  let body = {};
  let status = 500;


  return {
    status,
    body
  }
}
