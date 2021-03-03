import RequestReset from "../components/RequestReset"
import IntroSlider from "../components/IntroSlider"
import Reset from "../components/Reset"

const Request: React.FC = ({ query }) => {
  if (query?.token) {
    return (
      <>
        <IntroSlider />
        <Reset token={query.token} />
      </>
    )
  }
  return (
    <>
      <IntroSlider />
      <RequestReset />
    </>
  )
}
export default Request
