import { PrismaClient } from "@prisma/client";
import { PrismaErrorHelper } from "../@commons/errorHelper.js";

const prisma = new PrismaClient();

try {
  await prisma.$connect();
  console.log(`Database connected...`);
} catch (e:any) {
  // await prisma.$disconnect();
  // TODO
  // 1.catch any error here and probably log it to the server or file: adserver-log.txt
  console.log(`An error occured while connecting to database server: ${e.name} <> ${e.message}`);
};

export default prisma;