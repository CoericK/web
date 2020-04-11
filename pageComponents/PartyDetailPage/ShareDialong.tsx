import { Dialog, InputGroup } from "@blueprintjs/core";
import * as React from "react";
import css from "./ShareDialog.module.css";

interface Props extends React.Attributes {
  shareURL: URL;
  open?: boolean;
  onCloseRequest?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function ShareDialog({
  shareURL,
  open = false,
  onCloseRequest = () => {},
  ...props
}: Props) {
  return (
    <Dialog onClose={onCloseRequest} isOpen={open} {...props}>
      <div className={css["dialog-content-root"]}>
        <span className={css.description}>
          Share this URL with yor friends!
        </span>

        <InputGroup
          type="text"
          leftIcon="globe"
          large
          readOnly
          value={shareURL.href}
          className={css["url-input"]}
        />
      </div>
    </Dialog>
  );
}
