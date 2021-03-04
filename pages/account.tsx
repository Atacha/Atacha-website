import Link from "next/link"
// import { useAuth } from "../hooks/useAuth"
import { useUser } from "../hooks/useUser"
import SignOut from "../components/SignOut"

const Account: React.FC = () => {
  const user = useUser()
  // const auth = useAuth()
  if (!user)
    return (
      <div>
        Debes inicias sesion primero <br />
        <Link href="/login">Incio Sesion</Link>
      </div>
    )
  return (
    <div>
      <h2>{`Welcome! ${user.name} `}</h2>
      <p>{`You are logged in with ${user.email}`}</p>
      <SignOut />
    </div>
  )
}
export default Account
