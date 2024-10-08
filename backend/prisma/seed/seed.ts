import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { pbkdf2Sync, randomBytes } from "crypto";

const prisma = new PrismaClient();

const user: Omit<User, "id" | "createdAt"> = {
  name: "Admin User",
  email: "admin@localhost.io",
  password: process.env.SEED_USER_PASSWORD!,
};

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { salt, hash };
};

async function seed() {
  const { salt, hash } = hashPassword(user.password);
  user.password = `${salt}:${hash}`;

  await prisma.user.create({
    data: {
      ...user,
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
