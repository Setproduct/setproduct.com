import type { GetStaticProps } from "next";
import SearchPage from "../components/pages/SearchPage";
import { getNavData } from "../lib/nav/buildNavData";
import type { NavData } from "../lib/nav/types";
import { buildSearchIndex } from "../lib/search/buildIndex";
import type { SearchableItem } from "../lib/search/types";

type Props = {
  items: SearchableItem[];
  navData: NavData;
};

export default function SearchRoute({ items, navData }: Props) {
  return <SearchPage items={items} navData={navData} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      items: buildSearchIndex(),
      navData: getNavData(),
    },
  };
};
