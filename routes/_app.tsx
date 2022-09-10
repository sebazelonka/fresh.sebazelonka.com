import { Head, asset } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <Header />
      <Component />
    </>
  );
}
