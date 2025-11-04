"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

interface Body {
    email: string,
    password: string,
}

type SignUpBody = Body & { name: string };

export type AuthResult = {
    success: boolean;
    message?: string;
}

export const signIn = async (body: Body): Promise<AuthResult> => {
    try {
        await auth.api.signInEmail({ 
            body,
            headers: await headers()
        });

        return {
            success: true,
            message: "Signed in successfully!",
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Sign in failed",
        };
    }
}

export const signInBySocial = async (): Promise<AuthResult> => {
    try {
        await auth.api.signInSocial({
            body: {
                provider: "google",
            },
        });

        return {
            success: true,
            message: "Signed in successfully!",
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Sign in failed",
        };
    }
}

export const signUp = async (body: SignUpBody): Promise<AuthResult> => {
    try {
        await auth.api.signUpEmail({ 
            body,
            headers: await headers()
        });
        return {
            success: true,
            message: "Signed up successfully!",
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Sign up failed"
        };
    }
}

export async function logout() {
    try {
        await auth.api.signOut({
            headers: await headers()
        });
    } catch (error) {
        console.error("Logout error:", error);
    }
    redirect("/login");
}
