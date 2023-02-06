import { FunctionComponent } from "react";
import Head from 'next/head'

interface Props {
  title: string,
  description: string,
}

export const Meta: FunctionComponent<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title} - StrollDog</title>
      <meta
        name="description"
        content={description}
      />
      <meta name="og:title" content={description} />
      <meta name="og:type" content="page" />
      <meta name="og:site_name" content="StrollDog" />
      <meta name="og:description"
            content={description} />
    </Head>
  );
}
