import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IEncryptionService } from './encryption.types';

@Injectable()
export class AES256EncryptionService implements IEncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey = process.env.ENCRYPTION_KEY;
  private readonly iv = crypto.randomBytes(16);

  async encrypt(data: string, patchKey?: string): Promise<string> {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      `${this.secretKey}${patchKey}`,
      this.iv,
    );
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${this.iv.toString('hex')}:${encrypted}`;
  }

  async decrypt(encryptedData: string, patchKey?: string): Promise<string> {
    const [iv, encrypted] = encryptedData.split(':');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      `${this.secretKey}${patchKey}`,
      Buffer.from(iv, 'hex'),
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
