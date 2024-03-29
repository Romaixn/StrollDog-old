import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../../components/admin/place/Show";
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
  const apiPath = asPath.replace("admin/", "");
  const place = await fetch(apiPath);

  return { place };
};

export default Page;
