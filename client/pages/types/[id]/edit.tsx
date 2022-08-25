import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/type/Form";
import { Type } from "../../../types/Type";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  type: Type;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ type }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{type && `Edit Type ${type["@id"]}`}</title>
        </Head>
      </div>
      <Form type={type} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const type = await fetch(asPath.replace("/edit", ""));

  return { type };
};

export default Page;
