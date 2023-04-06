import { AppProps } from "next/app";
import ApolloSettings from "../src/components/apollo";
import Layout from "../src/components/layout";
import "../styles/myGlobals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloSettings>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloSettings>
  );
}
