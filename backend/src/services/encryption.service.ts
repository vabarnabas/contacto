import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export default function EncryptionService() {
  function encrypt(text: string): string {
    if (text === undefined) {
      throw new Error("The 'text' argument must not be undefined");
    }

    const iv = randomBytes(16);
    const cipher = createCipheriv(
      "aes-256-gcm",
      Buffer.from(process.env.ENCRYPTION_KEY || "", "hex"),
      iv
    );

    const encrypted = Buffer.concat([
      cipher.update(text, "utf8"),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${encrypted.toString(
      "hex"
    )}:${authTag.toString("hex")}`;
  }

  function decrypt(hash: string): string {
    const [iv, encryptedText, authTag] = hash.split(":");

    const decipher = createDecipheriv(
      "aes-256-gcm",
      Buffer.from(process.env.ENCRYPTION_KEY || "", "hex"),
      Buffer.from(iv, "hex")
    );

    decipher.setAuthTag(Buffer.from(authTag, "hex"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, "hex")),
      decipher.final(),
    ]);

    return decrypted.toString();
  }

  return {
    encrypt,
    decrypt,
  };
}
