export interface AuthInterface {
    userId: number;
    passwordResetKey: string;
    passwordResetExpires: Date;
}