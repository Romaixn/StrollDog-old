import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/comment/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Comment </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
