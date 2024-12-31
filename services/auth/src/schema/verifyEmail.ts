import { object, string } from 'zod'

export const verifyEmailSchema = object({
    body: object({
        emailVerificationKey: string()
    })
})

export const resetPasswordSchema = object({
    body: object({
        email: string().email()
    })
})


export const passwordChangeSchema = object({
    body: object({
        passwordResetKey: string(),
        password: string()
    })
})
