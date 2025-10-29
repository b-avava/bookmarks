"use server";

import { auth } from "@/lib/auth";

interface Body {
    email: string,
    password: string,
}

type SignUpBody = Body & { name: string };

export const signIn = async (body: Body) => {
    await auth.api.signInEmail({ body });
}

export const signUp = async (body: SignUpBody) => {
    await auth.api.signUpEmail({ body });
}
