import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function VideoTile({ src, text, textClass = "jp text-white text-5xl", textPosition, className, overlay = false, index = 0,}) {

  const controls = useAnimation(); 
  const videoRef = useRef(null);

  useEffect(() => {
    controls.start("visible").then(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    });
  }, [controls]);

  const videoVariants = {
    hidden: { opacity: 0, x: 400 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
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
        variants={videoVariants}
        initial="hidden"
        animate={controls}
        className={`relative w-full aspect-video ${className}`}
      >
          <video className="object-cover" muted loop ref={videoRef} src={src} preload="auto"></video>
          {overlay && <div className="absolute inset-0 bg-black/30 z-10"/>}
          {text && (
            <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5 + 3, duration: 1.5 }}
            className={`absolute  z-20 ${textPosition} ${textClass}`}
            >
              {text}
            </motion.div> 
          )}
      </motion.div> 
    );
  }