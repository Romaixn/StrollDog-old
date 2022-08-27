import type { NextPage } from 'next'
import { Layout } from '../components/admin/Layout'
import Head from "next/head";

const Admin: NextPage = () => {
  return (
    <Layout header="Tableau de bord">
      <Head>
        <title>Administration</title>
      </Head>
      <h1>Contenu</h1>
    </Layout>
  )
}

export default Admin
