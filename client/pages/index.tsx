import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

const Home: NextPage = () => {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
      return (
        <div>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )
    }

  return (
    <h1>Hello world!</h1>
  )
}

export default Home
