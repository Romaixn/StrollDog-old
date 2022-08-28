import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../../components/admin/comment/Form";
import { Comment } from "../../../../types/Comment";
import { fetch } from "../../../../utils/dataAccess";
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
          <title>{comment && `Edit Comment ${comment["@id"]}`}</title>
        </Head>
      </div>
      <Form comment={comment} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const comment = await fetch(asPath.replace("/edit", ""));

  return { comment };
};

export default Page;
