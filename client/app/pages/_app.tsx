import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
