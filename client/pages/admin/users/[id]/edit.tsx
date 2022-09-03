import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../../components/admin/user/Form";
import { User } from "../../../../types/User";
import { fetch } from "../../../../utils/dataAccess";
import Head from "next/head";
import { Layout } from "../../../../components/admin/Layout";

interface Props {
  user: User;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ user }) => {
  return (
    <Layout>
      <div>
        <Head>
          <title>{user && `Edit User ${user["@id"]}`}</title>
        </Head>
      </div>
      <Form user={user} />
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const user = await fetch(asPath.replace("/edit", ""));

  return { user };
};

export default Page;
