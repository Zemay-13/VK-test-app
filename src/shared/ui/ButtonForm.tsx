import { Button, Spinner } from "@vkontakte/vkui";
type Props = {
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
  isFetching?: boolean;
  size?: "s" | "m" | "l";
  text: string;
};
export const ButtonForm = (props: Props) => {
  const { onClick, disabled, isFetching, style, text, size } = props;
  return (
    <Button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      size={size ? size : "l"}
      style={{
        marginBottom: "8px",
        marginTop: "8px",
        width: "280px",
        ...style,
      }}
    >
      {isFetching ? <Spinner /> : text}
    </Button>
  );
};
