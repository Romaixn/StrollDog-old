import { NextComponentType, NextPageContext } from "next";
import { List } from "../../../components/admin/type/List";
import { Layout } from "../../../components/admin/Layout";
import { PagedCollection } from "../../../types/Collection";
import { Type } from "../../../types/Type";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Type>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <Layout>
    <div>
      <Head>
        <title>Liste des types</title>
      </Head>
    </div>
    <List types={collection["hydra:member"]} />
  </Layout>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/types");

  return { collection };
};

export default Page;
