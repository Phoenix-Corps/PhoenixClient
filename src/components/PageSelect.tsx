import { useMemo } from "react";

export type SelectPageCallback = (page: number) => void;

export interface IPageSelectProps {
  pageInfo: IAPIPaginationInfo;
  onSelect?: SelectPageCallback;
}

const buildPageList = (pageInfo: IAPIPaginationInfo): number[] => {
  const start = Math.max(1, pageInfo.currentPage + 1 - 3);
  const end = Math.min(pageInfo.pageCount, pageInfo.currentPage + 1 + 3);
  const ret = [];
  for (let n = start; n <= end; n++) ret.push(n);
  return ret;
};

export const PageSelect = (props: IPageSelectProps) => {
  const pages = useMemo(() => buildPageList(props.pageInfo), [props.pageInfo]);

  return (
    <div className="flex justify-center">
      {pages.map(p => (
        <button
          key={p}
          color={p - 1 === props.pageInfo.currentPage ? "secondary" : "primary"}
          className={`rounded m-1`}
          onClick={() => props.onSelect?.(p - 1)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};
