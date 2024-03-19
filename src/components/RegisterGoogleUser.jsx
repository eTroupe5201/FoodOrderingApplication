import { getAuth, signInWithPopup } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import logtail from "../logger.js";

export const RegisterGoogleUser = async (setFromOTP,setFromSocialMedia, setRegistrationState, toast) => {
    setFromOTP(false);
    setFromSocialMedia(true);
    try{  
    const auth = getAuth();
  
      const provider = new GoogleAuthProvider();
      
      provider.setCustomParameters({ prompt: "select_account" }); // Force account selection prompt

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
 logtail.info("Google registration email sent", {fbUser: userForVerification.uid, email: userForVerification.email});  
 
          }  catch (error) {
              console.error("Error registering facebook account:", error);
              toast({
                  title: "Registration for google user failed",
                  description: error.message,
                  position: "top",
                  status: "error",
                  isClosable: true,
              });
              logtail.error(`Google user registration error: ${error.message}`, {fbUser: auth.currentUser.uid});
  
  
      }
};
