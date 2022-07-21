import type { RequestHandler } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const get: RequestHandler = async ({request}) => {
  let body = {};
  let status = 500;


  return {
    status,
    body
  }
}
