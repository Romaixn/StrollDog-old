import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/place/List";
import { PagedCollection } from "../../types/Collection";
import { Place } from "../../types/Place";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Place>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Place List</title>
      </Head>
    </div>
    <List places={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/places");

  return { collection };
};

export default Page;
