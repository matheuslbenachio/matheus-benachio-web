import { memo, ReactNode } from "react";
import "./Message.scss";

/**
 * Props of the message component.
 */
interface MessageProps {
  content?: ReactNode;
  visible?: boolean;
}

/**
 * Component that displays with absolute-positioning.
 * A `visible` prop may be passed to indicate if it should be visible or not.
 */
function Message(props: MessageProps) {
  const { visible, content } = props;
  return (
    <div
      data-testid="message"
      className={`message ${visible ? "visible" : ""}`}
    >
      {content}
    </div>
  );
}

export default memo(Message);
