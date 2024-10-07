import { prisma } from "../prisma";
import { CreateResponse } from "../types/response.dto";

export default function ResponseService() {
  async function findAll() {
    return await prisma.response.findMany();
  }

  async function findSpecific(id: string) {
    return await prisma.response.findUnique({
      where: {
        id,
      },
    });
  }

  async function findByApplicationId(applicationId: string) {
    return await prisma.response.findMany({
      where: {
        applicationId,
      },
    });
  }

  async function create(dto: CreateResponse) {
    return await prisma.response.create({
      data: dto,
    });
  }

  async function remove(id: string) {
    return await prisma.response.delete({
      where: {
        id,
      },
    });
  }

  return {
    findAll,
    findSpecific,
    findByApplicationId,
    create,
    remove,
  };
}
