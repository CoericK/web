import { Dialog, InputGroup } from "@blueprintjs/core";
import * as React from "react";
import styled from "styled-components";

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
      <Content>
        <Description>Share this URL with yor friends!</Description>

        <URLInput
          type="text"
          leftIcon="globe"
          large
          readOnly
          value={shareURL.href}
        />
      </Content>
    </Dialog>
  );
}

const Content = styled.div`
  padding: 32px;
`;

const Description = styled.span`
  font-size: 16px;
`;

const URLInput = styled(InputGroup)`
  margin-top: 32px;
`;
