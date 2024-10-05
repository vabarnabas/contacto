import { CreateApplication, UpdateApplication } from "../types/application.dto";
import { prisma } from "../prisma";

export default function ApplicationService() {
  async function findAll() {
    return await prisma.application.findMany();
  }

  async function findSpecific(id: string) {
    return await prisma.application.findUnique({
      where: {
        id,
      },
    });
  }

  async function findMy(userId: string) {
    return await prisma.application.findMany({
      where: {
        userId,
      },
    });
  }

  async function create(dto: CreateApplication) {
    return await prisma.application.create({
      data: dto,
    });
  }

  async function update(id: string, dto: UpdateApplication) {
    return await prisma.application.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
      },
    });
  }

  async function remove(id: string) {
    return await prisma.application.delete({
      where: {
        id,
      },
    });
  }

  return {
    findAll,
    findSpecific,
    findMy,
    create,
    update,
    remove,
  };
}
