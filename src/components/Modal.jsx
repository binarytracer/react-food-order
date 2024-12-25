import { useRef, useImperativeHandle, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal(props) {
  const { children, open, className = "", onClose, ...otherProps } = props;

  const modalRef = useRef();

  useEffect(() => {
    const modal = modalRef.current;

    if (open) {
      modal.showModal();
    }

    return () => {
      modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog
      ref={modalRef}
      {...otherProps}
      className={`modal ${className}`}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
