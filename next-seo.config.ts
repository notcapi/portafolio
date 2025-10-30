import type { DefaultSeoProps } from "next-seo";
import { defaultSEO } from "./lib/seo";

const config: DefaultSeoProps = {
  ...defaultSEO
};

export default config;
