import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="NotFound-page-container">
      <motion.h1
        animate={{ rotate: 360 }}
        transition={{ duration: 2 }}
        className="text-3xl text-center h1-NouFound text-green-200"
      >
        this is page 404 Not found
      </motion.h1>
    </div>
  );
}
