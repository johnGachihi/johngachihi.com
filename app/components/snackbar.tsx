import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Snackbar({ open, children }: PropsWithChildren<{ open: boolean }>) {
  return (
    <AnimatePresence>
      {open &&
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
          className="fixed bottom-3 left-4 right-4 sm:left-[unset] sm:w-fit sm:min-w-[300px] h-12 bg-black text-white rounded pl-4 flex items-center justify-between shadow-lg drop-shadow-md"
          role="status"
          aria-relevant="additions"
        >
          <div aria-atomic="false" className="body2">{children}</div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
