import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (request: Request, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;

  switch (request.method.toLocaleUpperCase()) {
    case "GET":
      body = await prisma.actividad.findMany({take: 10});
      status = 200;
      break;
  
    default:
      break;
  }

  return {
    status,
    body
  }
}
