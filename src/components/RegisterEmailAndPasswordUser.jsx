import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../utils/firebase" 
import { sendEmailVerification } from "firebase/auth"
import logtail from "../logger.js"
                 
export const RegisterEmailAndPasswordUser = async (setFromOTP, saveData, setformData, data, setFromSocialMedia, setRegistrationState, toast) => {
    setFromSocialMedia(false);
    setformData(data);

    try {
        saveData(data);
    } catch (error) {console.log(error);}

    // Verify email and password match
    if (data.email !== data.confirmEmail || data.password !== data.confirmPassword) {
        console.log("passwords or emails do not match"); //console log for testing
        toast({
            title: "Error",
            description: "Emails or passwords do not match.",
            position: "top",
            status: "error",
            isClosable: true,
        });
        return;
    }

    try {
        console.log("valid registration input"); //console log for testing
        /**
         * Create users and send verification emails
         * In Firebase, the default validity period for email verification links sent to users is 24 hours. 
         * This means that users have 24 hours after receiving the email to click on the verification link 
         * to complete their email verification process. If the user does not click on the verification link during this period, 
         * the link will expire and the user needs to request a new verification email to complete the verification process.
         */ 
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  
        await sendEmailVerification(userCredential.user);
        toast({
            title: "Email has sent to be verified!",
            description: "Please check your email to verify your account.",
            position: "top",
            status: "success",
            isClosable: true,
        });
        logtail.info("Email registration email sent", {fbUser: userCredential.user.uid, email: data.email});       
        // Update the status to reflect waiting for email verification. 
        // When the user first clicks register button and sends an email, the button will change from register to verified status
        setRegistrationState("waitingForEmailVerification");

    } catch (error) {
        console.error("Error registering account:", error);
        toast({
            title: "Registration failed",
            description: error.message,
            position: "top",
            status: "error",
            isClosable: true,
        });
        logtail.error(`Email user registration error: ${error.message}`, {fbUser: auth.currentUser.uid, email: data.email});
    
    }

};


