import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../../components/admin/place/Form";
import { Place } from "../../../../types/Place";
import { fetch } from "../../../../utils/dataAccess";
import Head from "next/head";
import { Layout } from "../../../../components/admin/Layout";

interface Props {
  place: Place;
  influx: PagedCollection<Influx>,
  types: PagedCollection<Type>,
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ place, influx, types}) => {
  return (
    <Layout>
      <div>
        <Head>
          <title>{place && `Edit Place ${place["@id"]}`}</title>
        </Head>
      </div>
      <Form place={place} influx={influx['hydra:member']} types={types['hydra:member']} />
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  let apiPath = asPath.replace("/edit", "");
  apiPath = apiPath.replace("admin/", "");
  const place = await fetch(apiPath);

  const influx = await fetch("/influxes");
  const types = await fetch("/types");

  return { place, influx, types };
};

export default Page;
