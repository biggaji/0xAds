import { PrismaClient } from "@prisma/client";
import { PrismaErrorHelper } from "../@commons/errorHelper.js";

const prisma = new PrismaClient();

try {
  await prisma.$connect();
  console.log(`Database connected...`)
} catch (e:any) {
  // await prisma.$disconnect();
  
  console.log(`An error occured while connecting to database server: ${e.name} <> ${e.message}`);
};

export default prisma;