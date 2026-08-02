import axios from "axios";
import { useNavigate, useParams } from "react-router";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";

const EmailVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const registration = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_URL}/verify/${token}`
      );

      navigate("/login");

      if (response.data.success) {
        console.log("Email verification successful");
      } else {
        console.log("Email verification failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error occurred while verifying email:", error);
    }
  }

  return (
    <>
      <Container>
        <div className="mt-5 lg:mt-10">
          <BreadCrumb />
        </div>

        <div className="mt-10 lg:mt-20 flex justify-center">
          <div className="w-full max-w-md rounded-md border border-[#E5E5E5] bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold mb-4">Verify Your Email</h2>
            <p className="text-sm text-[#666] mb-6">
              We sent an email with a verification link to your inbox. Please open the email and verify your account to continue.
            </p>

            <button
              onClick={registration}
              className="w-full rounded-sm bg-primary px-6 py-4 text-white hover:bg-[#d60303] transition-colors duration-300 cursor-pointer"
            >
              Continue to Login
            </button>

            <p className="mt-5 text-center text-sm text-[#666]">
              Didn’t receive the email? Check your spam folder or try again later.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EmailVerify;
