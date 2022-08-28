import { NextComponentType, NextPageContext } from "next";
import { List } from "../../../components/admin/user/List";
import { PagedCollection } from "../../../types/Collection";
import { User } from "../../../types/User";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<User>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>User List</title>
      </Head>
    </div>
    <List users={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/users");

  return { collection };
};

export default Page;
