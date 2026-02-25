"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const heroRef = useRef(null);
  const lettersRef = useRef([]);
  const statsRef = useRef([]);
  const carRef = useRef(null);
  const roadRef = useRef(null);
  const audioRef = useRef(null);
  const specsRef = useRef(null);

 
  useEffect(() => {
    const unlockAudio = () => {
      const engine = audioRef.current;
      if (!engine) return;

      engine.play().then(() => {
        engine.pause();
        engine.currentTime = 0;
      }).catch(() => {});

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const engine = audioRef.current;

      const letters = lettersRef.current.filter(Boolean);
      const stats = statsRef.current.filter(Boolean);

      if (!carRef.current || !roadRef.current) return;

      // Animate Headline & Stats
      const tl = gsap.timeline({
        onStart: () => {
          if (!engine) return;
          engine.currentTime = 0;
          engine.volume = 0;
          engine.play().catch(() => {});
          gsap.to(engine, { volume: 0.4, duration: 1 });
        }
      });

      tl.from(letters, {
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      });

      tl.from(stats, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      // Scroll Car
      gsap.to(carRef.current, {
        x: 700,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Road Scroll
      gsap.to(roadRef.current, {
        backgroundPositionX: "-4000px",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          scrub: true,
        },
      });

      // Animate Specs Section
      gsap.from(".spec-item", {
        y: 60,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: specsRef.current,
          start: "top 80%",
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headline = "PORSCHE 911 TURBO S";

  return (
    <div>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="h-screen flex flex-col justify-center items-center relative overflow-hidden -translate-y-10 bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <audio ref={audioRef} src="/engine.mp3" preload="auto" />

        <div
          ref={roadRef}
          className="absolute bottom-0 w-full h-32 bg-repeat-x bg-[url('/road.png')]"
        />

        <h1 className="text-5xl md:text-8xl font-bold -mt-6 tracking-[0.6rem] text-center flex flex-wrap justify-center z-10">
          {headline.split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="inline-block"
            >
              {letter}
            </span>
          ))}
        </h1>

        <div className="flex gap-16 mt-16 mb-8 z-10">
          {[
            { value: "640 HP", label: "Horsepower" },
            { value: "2.7s", label: "0–100 km/h" },
            { value: "330 km/h", label: "Top Speed" },
          ].map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                {stat.value}
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={carRef}
          className="absolute bottom-10 w-[450px] md:w-[600px] will-change-transform"
        >
          <img src="/car.png" alt="Car Body" />
        </div>
      </section>

      {/* PERFORMANCE SECTION */}
      <section
        ref={specsRef}
        className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
          911 TURBO S PERFORMANCE
        </h2>

        <div className="grid md:grid-cols-2 gap-16 text-xl md:text-2xl max-w-5xl w-full">

          <div className="spec-item">
            <h3 className="text-gray-500 mb-2">Engine</h3>
            <p>3.8L Twin-Turbocharged Flat-6 (Boxer)</p>
          </div>

          <div className="spec-item">
            <h3 className="text-gray-500 mb-2">Transmission</h3>
            <p>8-Speed PDK Dual-Clutch</p>
          </div>

          <div className="spec-item">
            <h3 className="text-gray-500 mb-2">Drivetrain</h3>
            <p>All-Wheel Drive (AWD)</p>
          </div>

          <div className="spec-item">
            <h3 className="text-gray-500 mb-2">Torque</h3>
            <p>800 Nm</p>
          </div>

        </div>
      </section>

    </div>
  );
}