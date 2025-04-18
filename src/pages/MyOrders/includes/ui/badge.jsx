import cn from "classnames";
import { twMerge } from "tailwind-merge";

const Badge = ({
  className,
  color: colorOverride,
  textColor: textColorOverride,
  text,
  style,
  animate = false,
}) => {
  const classes = {
    root: "px-3 py-1 rounded-full text-sm",
    default: "bg-accent",
    animate: "animate-pulse",
    text: "text-light",
  };

  return (
    <span
      className={twMerge(
        cn(
          classes.root,
          {
            [classes.default]: !colorOverride,
            [classes.text]: !textColorOverride,
            [classes.animate]: animate,
          },
          colorOverride,
          textColorOverride,
          className,
          "inline-flex"
        )
      )}
      style={style}
    >
      {text}
    </span>
  );
};

export default Badge;
