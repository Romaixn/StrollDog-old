import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/admin/place/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Place </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
