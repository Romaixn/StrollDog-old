import { NextComponentType, NextPageContext } from "next";
import { List } from "../../../components/admin/user/List";
import { PagedCollection } from "../../../types/Collection";
import { User } from "../../../types/User";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";
import { Layout } from "../../../components/admin/Layout";

interface Props {
  collection: PagedCollection<User>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <Layout>
    <div>
      <Head>
        <title>User List</title>
      </Head>
    </div>
    <List users={collection["hydra:member"]} />
  </Layout>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/users");

  return { collection };
};

export default Page;
