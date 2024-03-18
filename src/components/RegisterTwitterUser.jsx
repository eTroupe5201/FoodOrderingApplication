import { getAuth, signInWithPopup } from "firebase/auth";;
import { sendEmailVerification } from "firebase/auth"
import { TwitterAuthProvider } from "firebase/auth";

export const RegisterTwitterUser = async (setFromSocialMedia, setRegistrationState, toast) => {
    setFromSocialMedia(true);
    try{  
    const auth = getAuth();
  
      const provider = new TwitterAuthProvider();
      provider.setCustomParameters({
      "display": "popup"
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
 
          }  catch (error) {
              console.error("Error registering twitter account:", error);
              toast({
                  title: "Registration for twitter user failed",
                  description: error.message,
                  position: "top",
                  status: "error",
                  isClosable: true,
              });
  
      }
};
