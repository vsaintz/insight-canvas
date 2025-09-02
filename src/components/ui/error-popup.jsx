import { useEffect, useState } from "react"
import { BadgeAlert } from 'lucide-react'

export default function ErrorPopup({ message, duration, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-10 right-10 bg-bg-error px-4 py-2 rounded shadow-lg">
      <p className="text-text-error text-sm flex items-center gap-2"><BadgeAlert />{message}</p>
    </div>
  );
}
