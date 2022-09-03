import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/admin/user/Form";
import Head from "next/head";
import { Layout } from "../../../components/admin/Layout";

const Page: NextComponentType<NextPageContext> = () => (
  <Layout>
    <div>
      <Head>
        <title>Create User </title>
      </Head>
    </div>
    <Form />
  </Layout>
);

export default Page;
