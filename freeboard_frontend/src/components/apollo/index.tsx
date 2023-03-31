import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

interface IProps {
  children: JSX.Element;
}
const ApolloSettings = (props: IProps) => {
  const client = new ApolloClient({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloSettings;
