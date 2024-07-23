import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center my-40">
      <SignIn />
    </div>
  );
};

export default SignInPage;
