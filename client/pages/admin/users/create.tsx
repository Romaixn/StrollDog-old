import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/admin/user/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create User </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
