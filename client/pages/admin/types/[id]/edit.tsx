import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../../components/admin/type/Form";
import { Type } from "../../../../types/Type";
import { fetch } from "../../../../utils/dataAccess";
import Head from "next/head";
import { Layout } from "../../../../components/admin/Layout";

interface Props {
  type: Type;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ type }) => {
  return (
    <Layout>
      <div>
        <Head>
          <title>{type && `Edit Type ${type["@id"]}`}</title>
        </Head>
      </div>
      <Form type={type} />
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  let apiPath = asPath.replace("/edit", "");
  apiPath = apiPath.replace("admin/", "");
  const type = await fetch(apiPath);

  return { type };
};

export default Page;
