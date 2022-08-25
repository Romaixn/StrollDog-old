import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/type/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Type </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
