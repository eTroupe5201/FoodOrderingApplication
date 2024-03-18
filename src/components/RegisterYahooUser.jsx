import { getAuth, signInWithPopup } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth"
export const RegisterYahooUser = async (setFromSocialMedia, setRegistrationState, toast) => {
    setFromSocialMedia(true);
    try {
        const auth = getAuth();
        const provider = new OAuthProvider("yahoo.com");
        const result = await signInWithPopup(auth, provider);
        const userForVerification = result.user;

        toast({
            title: "Email has sent to be verified!",
            description: "Please check your email to verify your account.",
            position: "top",
            status: "success",
            isClosable: true,
        });

        await sendEmailVerification(userForVerification);
        setRegistrationState("waitingForEmailVerification");
    } catch (error) {
        console.error("Error registering yahoo account:", error);
        toast({
            title: "Registration for yahoo user failed",
            description: error.message,
            position: "top",
            status: "error",
            isClosable: true,
        });
    }
};


