import SignForm from "@/components/react-components/SignForm";
import { getCurrentUser } from "@/lib/auth";

export default async function SignUp() {
    const user = await getCurrentUser();
    console.log(user);
    return <SignForm user={user} varient="sign-up" />;
}
