// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: number
    name: string
    email: string
    role: string
    isAdmin: boolean
  }
}

export {}
