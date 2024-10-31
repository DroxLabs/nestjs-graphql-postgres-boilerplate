export interface IEncryptionService {
  encrypt(data: string, patchKey?: string): Promise<string>;
  decrypt(encryptedData: string, patchKey?: string): Promise<string>;
}
