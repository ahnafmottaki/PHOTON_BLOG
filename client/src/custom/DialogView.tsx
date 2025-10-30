import { createPortal } from "react-dom";
type DialogViewProp = { children: React.ReactNode; onOverlayClick: () => void };

const DialogView: React.FC<DialogViewProp> = ({ children, onOverlayClick }) => {
  const modalRoot = document.getElementById("modal-root")!;
  const handleModal = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target?.dataset?.overlay === "true") {
      onOverlayClick();
    }
  };
  return createPortal(
    <section
      className="fixed inset-0 bg-black/30 overflow-auto py-15 overlay"
      data-overlay={true}
      onClick={handleModal}
    >
      {children}
    </section>,
    modalRoot
  );
};

export default DialogView;
