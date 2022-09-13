import { Head, asset } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" media="screen" />
      </Head>
      <Header />
      <Component />
      <Footer />
    </>
  );
}
