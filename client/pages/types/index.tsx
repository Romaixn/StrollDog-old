import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/type/List";
import { PagedCollection } from "../../types/Collection";
import { Type } from "../../types/Type";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Type>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Type List</title>
      </Head>
    </div>
    <List types={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/types");

  return { collection };
};

export default Page;
