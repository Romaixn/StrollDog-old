import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/type/Form";
import { Layout } from "../../../components/admin/Layout";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <Layout>
    <div>
      <Head>
        <title>Créer un nouveau type</title>
      </Head>
    </div>
    <Form />
  </Layout>
);

export default Page;
