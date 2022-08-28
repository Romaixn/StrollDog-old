import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../../components/place/Show";
import { Place } from "../../../../types/Place";
import { fetch } from "../../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  place: Place;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ place }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Place ${place["@id"]}`}</title>
        </Head>
      </div>
      <Show place={place} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const place = await fetch(asPath);

  return { place };
};

export default Page;
