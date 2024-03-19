import { getAuth, signInWithPopup } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth"
import logtail from "../logger.js";

export const RegisterYahooUser = async (setFromOTP,setFromSocialMedia, setRegistrationState, toast) => {
    setFromOTP(false);
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
        logtail.info("Yahoo registration email sent", {fbUser: userForVerification.uid, email: userForVerification.email});

    } catch (error) {
        console.error("Error registering yahoo account:", error);
        toast({
            title: "Registration for yahoo user failed",
            description: error.message,
            position: "top",
            status: "error",
            isClosable: true,
        });
        logtail.error(`Yahoo user registration error: ${error.message}`, {fbUser: auth.currentUser.uid});

    }
};


