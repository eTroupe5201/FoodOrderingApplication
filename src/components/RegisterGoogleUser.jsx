import { getAuth, signInWithPopup } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";

export const RegisterGoogleUser = async (setFromSocialMedia, setRegistrationState, toast) => {
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
 
          }  catch (error) {
              console.error("Error registering facebook account:", error);
              toast({
                  title: "Registration for google user failed",
                  description: error.message,
                  position: "top",
                  status: "error",
                  isClosable: true,
              });
  
      }
};
