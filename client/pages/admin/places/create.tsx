import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/admin/place/Form";
import Head from "next/head";
import { Layout } from "../../../components/admin/Layout";

const Page: NextComponentType<NextPageContext> = () => (
  <Layout>
    <div>
      <Head>
        <title>Create Place </title>
      </Head>
    </div>
    <Form />
  </Layout>
);

export default Page;
