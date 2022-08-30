import type { NextPage } from 'next'
import { Layout } from '../../components/admin/Layout'
import Head from "next/head";
import { useSession } from 'next-auth/react';

const Admin: NextPage = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <Head>
        <title>Administration</title>
      </Head>
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
        <div className="py-4">
          Tableau de bord
        </div>
      </div>
    </Layout>
  )
}

export default Admin
