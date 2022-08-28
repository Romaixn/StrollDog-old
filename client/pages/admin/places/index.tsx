import { NextComponentType, NextPageContext } from "next";
import { List } from "../../../components/place/List";
import { PagedCollection } from "../../../types/Collection";
import { Place } from "../../../types/Place";
import { fetch } from "../../../utils/dataAccess";
import { Layout } from "../../../components/admin/Layout";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Place>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <Layout header="Liste des lieux">
    <div>
      <Head>
        <title>Liste des lieux</title>
      </Head>
    </div>
    <List places={collection["hydra:member"]} />
  </Layout>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/places");

  return { collection };
};

export default Page;
