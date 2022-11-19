import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/admin/place/Form";
import Head from "next/head";
import { Layout } from "../../../components/admin/Layout";
import { fetch } from "../../../utils/dataAccess";
import { Influx } from "../../../types/Influx";
import { Type } from "../../../types/Type";
import {PagedCollection} from "../../../types/Collection";

interface Props {
  influx: PagedCollection<Influx>,
  types: PagedCollection<Type>,
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ influx, types}) => (
  <Layout>
    <div>
      <Head>
        <title>Create Place </title>
      </Head>
    </div>
    <Form influx={influx['hydra:member']} types={types['hydra:member']} />
  </Layout>
);

Page.getInitialProps = async () => {
  const influx = await fetch("/influxes");
  const types = await fetch("/types");

  return { influx, types };
};

export default Page;
