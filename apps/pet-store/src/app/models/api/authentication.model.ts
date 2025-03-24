export class AuthenticationPayload {
  public identifier!: string;
  public password!: string;
}

export class AuthenticationResponse {
  public jwt!: string;
  public user!: {
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    publishedAt: string
  }
}