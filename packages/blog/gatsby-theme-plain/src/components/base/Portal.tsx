import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type PortalPropsType = {
  children: React.ReactNode;
  getContainer?: (() => HTMLElement) | false;
};

export const Portal: React.FC<PortalPropsType> = ({
  children,
  getContainer,
}) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (getContainer === false) {
      return;
    }
    const container = getContainer?.() ?? document.body;
    setMountNode(container);
  }, [getContainer]);

  if (getContainer === false) {
    return <>{children}</>;
  }

  return mountNode ? createPortal(children, mountNode) : null;
};
