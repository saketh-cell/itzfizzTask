"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ScrollIndicator() {
  const progressRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height =
        document.body.scrollHeight - window.innerHeight;
      const progress = scrollTop / height;

      gsap.to(progressRef.current, {
        scaleX: progress,
        transformOrigin: "left center",
        ease: "none",
        duration: 0.1,
      });
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div
        ref={progressRef}
        className="h-full bg-white scale-x-0"
      />
    </div>
  );
}