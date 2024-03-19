import { getAuth, signInWithPopup } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth"
import { FacebookAuthProvider } from "firebase/auth";
import logtail from "../logger.js";

export const RegisterFacebookUser = async (setFromOTP, setFromSocialMedia, setRegistrationState, toast) => {
    setFromOTP(false);
    setFromSocialMedia(true);
    try{  
    const auth = getAuth();
  
      const provider = new FacebookAuthProvider();
      provider.setCustomParameters({
      "display": "  "
      });
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
 logtail.info("Facebook registration email sent", {fbUser: userForVerification.uid, email: userForVerification.email});                  
 
          }  catch (error) {
              console.error("Error registering facebook account:", error);
              toast({
                  title: "Registration for facebook user failed",
                  description: error.message,
                  position: "top",
                  status: "error",
                  isClosable: true,
              });
              logtail.error(`Facebook user registration error: ${error.message}`, {fbUser: auth.currentUser.uid});
      }
};
