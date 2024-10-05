import { randomBytes, pbkdf2Sync, timingSafeEqual } from "crypto";
import { sign } from "hono/jwt";

export default function AuthService() {
  function getToken(id: string, email: string, name: string) {
    return sign(
      {
        id,
        email,
        name,
        exp: Math.floor(Date.now() / 1000) + 60 * 120,
      },
      process.env.JWT_SECRET!
    );
  }

  function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return { salt, hash };
  }

  function verifyPassword(password: string, hash: string, salt: string) {
    const hashedBuffer = Buffer.from(
      pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"),
      "hex"
    );
    const storedBuffer = Buffer.from(hash, "hex");
    return timingSafeEqual(hashedBuffer, storedBuffer);
  }

  async function getPermissions(
    permissions: { name: string }[],
    userGroups: { permissions: { name: string }[] }[]
  ) {
    const uniquePermissions = [
      ...new Set([
        ...permissions.map((p) => p.name)!,
        ...userGroups.map((g) => g.permissions.map((p) => p.name)).flat()!,
      ]),
    ];

    return uniquePermissions;
  }

  return {
    getToken,
    hashPassword,
    verifyPassword,
    getPermissions,
  };
}
