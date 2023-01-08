import { NextComponentType, NextPageContext } from "next";
import { List } from "../components/front/places/List";
import { PagedCollection } from "../types/Collection";
import { Place } from "../types/Place";
import { fetch } from "../utils/dataAccess";
import { Layout } from "../components/front/Layout";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Place>;
}

const Places: NextComponentType<NextPageContext, Props, Props> = ({
                                                                  collection,
                                                                }) => (
  <Layout>
    <div>
      <Head>
        <title>Liste des lieux</title>
      </Head>
    </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lieux</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
          </p>
        </div>
        <List places={collection["hydra:member"]} />
      </div>
  </Layout>
);

Places.getInitialProps = async () => {
  const collection = await fetch("/places");

  return { collection };
};

export default Places;
