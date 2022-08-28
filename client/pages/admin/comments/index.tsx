import { NextComponentType, NextPageContext } from "next";
import { List } from "../../../components/admin/comment/List";
import { PagedCollection } from "../../../types/Collection";
import { Comment } from "../../../types/Comment";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Comment>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Comment List</title>
      </Head>
    </div>
    <List comments={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/comments");

  return { collection };
};

export default Page;
