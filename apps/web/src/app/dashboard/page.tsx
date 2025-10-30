import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { logout } from "@/server/users";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    return (
        <div>
            <h1>Welcome to the Dashboard, {session.user.name}!</h1>
            <form action={logout}>
                <Button className="cursor-pointer" type="submit">Logout</Button>
            </form>
        </div>
    );
}