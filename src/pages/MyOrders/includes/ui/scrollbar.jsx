import cn from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

const Scrollbar = ({ options, className, style, children, ...props }) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: { autoHide: "scroll" },
        ...(options ? options : {}),
      }}
      className={cn("os-theme-thin-dark", className)}
      style={style}
      defer
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scrollbar;
