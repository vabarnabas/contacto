import { prisma } from "../prisma";
import { UpdateUser } from "../types/user.dto";

export default function UserService() {
  async function findAll() {
    return await prisma.user.findMany();
  }

  async function findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async function findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async function update(id: string, data: UpdateUser) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async function remove(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  return {
    findAll,
    findById,
    findByEmail,
    update,
    remove,
  };
}
