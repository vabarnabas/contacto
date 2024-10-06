import {
  CreateApiKey,
  CreateApplication,
  UpdateApplication,
} from "../types/application.dto";
import { prisma } from "../prisma";
import { randomBytes } from "crypto";

export default function ApplicationService() {
  async function findAll() {
    return await prisma.application.findMany();
  }

  async function findSpecific(id: string) {
    return await prisma.application.findUnique({
      where: {
        id,
      },
      include: {
        apiKeys: true,
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

  async function createApiKey(dto: CreateApiKey) {
    const key = randomBytes(32).toString("hex");

    return await prisma.apiKey.create({
      data: { ...dto, key },
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
    createApiKey,
    update,
    remove,
  };
}
