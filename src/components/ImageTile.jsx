import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function ImageTile({src, text, textClass = "text-white", textPosition = "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", className = "", index = 0,}) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const imageVariants = {
    hidden: { opacity: 0, y: 400 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5,
        duration: 2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={imageVariants}
      initial="hidden"
      animate={controls}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <img src={src} alt="Tile" className="object-cover w-[550px]" />
      {text && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.5 + 1.5, duration: 1.5 }}
          className={`absolute z-20 ${textPosition} ${textClass} w-[525px]`}
        >
          {text}
        </motion.div>
      )}
    </motion.div>
  );
}
