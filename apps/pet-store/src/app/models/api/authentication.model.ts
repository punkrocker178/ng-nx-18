export class AuthenticationPayload {
  public identifier!: string;
  public password!: string;
}

export class AuthenticationResponse {
  public jwt!: string;
  public user!: User
}

export class User {
  public id!: number;
  public documentId!: string;
  public username!: string;
  public email!: string;
  public provider!: string;
  public confirmed!: boolean;
  public blocked!: boolean;
  public createdAt!: string;
  public updatedAt!: string;
  public publishedAt!: string
}