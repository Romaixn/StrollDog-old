import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

interface Props {
  token: object;
}

const Home: NextPage<Props> = ({ token }) => {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
      return (
        <div>
          <p>Access Token : {session.accessToken}</p>
          <p>Email : {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )
    }

  return (
    <h1>Hello world!</h1>
  )
}

export default Home
