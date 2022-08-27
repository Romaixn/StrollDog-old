import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/user/Form";
import { User } from "../../../types/User";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  user: User;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ user }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{user && `Edit User ${user["@id"]}`}</title>
        </Head>
      </div>
      <Form user={user} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const user = await fetch(asPath.replace("/edit", ""));

  return { user };
};

export default Page;
