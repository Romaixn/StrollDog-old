import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/comment/Show";
import { Comment } from "../../../types/Comment";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  comment: Comment;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  comment,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Comment ${comment["@id"]}`}</title>
        </Head>
      </div>
      <Show comment={comment} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const comment = await fetch(asPath);

  return { comment };
};

export default Page;
