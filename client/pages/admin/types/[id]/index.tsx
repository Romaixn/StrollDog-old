import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../../components/type/Show";
import { Type } from "../../../../types/Type";
import { fetch } from "../../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  type: Type;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ type }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Type ${type["@id"]}`}</title>
        </Head>
      </div>
      <Show type={type} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const type = await fetch(asPath);

  return { type };
};

export default Page;
