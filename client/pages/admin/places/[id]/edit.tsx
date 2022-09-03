import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../../components/admin/place/Form";
import { Place } from "../../../../types/Place";
import { fetch } from "../../../../utils/dataAccess";
import Head from "next/head";
import { Layout } from "../../../../components/admin/Layout";

interface Props {
  place: Place;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ place }) => {
  return (
    <Layout>
      <div>
        <Head>
          <title>{place && `Edit Place ${place["@id"]}`}</title>
        </Head>
      </div>
      <Form place={place} />
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  let apiPath = asPath.replace("/edit", "");
  apiPath = apiPath.replace("admin/", "");
  const place = await fetch(apiPath);

  return { place };
};

export default Page;
