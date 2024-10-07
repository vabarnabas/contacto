import {
  CreateApiKey,
  CreateApplication,
  UpdateApplication,
} from "../types/application.dto";
import { prisma } from "../prisma";
import { randomBytes } from "crypto";
import EncryptionService from "./encryption.service";

const encryptionService = EncryptionService();

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
        responses: true,
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

    const encryptedKey = encryptionService.encrypt(key);

    return await prisma.apiKey.create({
      data: { ...dto, key: encryptedKey },
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

  async function removeApiKey(id: string) {
    return await prisma.apiKey.delete({
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
    removeApiKey,
  };
}
