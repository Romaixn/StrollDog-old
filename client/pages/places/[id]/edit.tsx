import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/place/Form";
import { Place } from "../../../types/Place";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  place: Place;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ place }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{place && `Edit Place ${place["@id"]}`}</title>
        </Head>
      </div>
      <Form place={place} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const place = await fetch(asPath.replace("/edit", ""));

  return { place };
};

export default Page;
