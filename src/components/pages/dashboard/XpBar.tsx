import React, { useMemo } from "react";

import Decimal from "decimal.js";

type Props = {
  current: Decimal;
  max?: Decimal;
  showNumbers?: Boolean;
};

export const XpBar: React.FC<Props> = (props: Props) => {
  const percent = useMemo(() => {
    return (
      Math.min(
        props.current.div(props.max ?? (props.current || 1)).toNumber(),
        1
      ) * 100
    );
  }, [props.current, props.max]);

  return (
    <div className="w-full bg-gray-300 rounded-full overflow-hidden h-3 relative">
      <div
        className="h-full text-center font-bold"
        style={{ width: `${percent}%`, background: "var(--color_textAccent)" }}
      />
      {props.showNumbers && (
        <div className="absolute inset-0 flex justify-center items-center font-bold din color_text">
          {props.current.toFixed(0)} / {(props.max ?? props.current).toFixed(0)}
        </div>
      )}
    </div>
  );
};
