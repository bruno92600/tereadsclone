import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 transition-all duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={`z-10 w-full max-w-lg rounded-2xl bg-surface border border-white/10 px-6 py-5 shadow-xl transform transition-all duration-700 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        <div className="flex items-center justify-between border-b border-border">
          <h2 className="py-2 text-white/90">{title}</h2>
          <button
            className="text-white hover:text-purple-500 transition cursor-pointer"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
