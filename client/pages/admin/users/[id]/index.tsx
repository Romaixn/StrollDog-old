import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../../components/user/Show";
import { User } from "../../../../types/User";
import { fetch } from "../../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  user: User;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ user }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show User ${user["@id"]}`}</title>
        </Head>
      </div>
      <Show user={user} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const user = await fetch(asPath);

  return { user };
};

export default Page;
