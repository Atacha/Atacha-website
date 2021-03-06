import Link from "next/link"
import SingUpForm from "../components/Forms/singUpForm"
import IntroSlider from "../components/IntroCarousel/IntroSlider"

const SignUpPage: React.FC = () => {
  return (
    <>
      <IntroSlider />
      <SingUpForm />
    </>
  )
}
export default SignUpPage
