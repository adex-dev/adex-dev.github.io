import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const FULL_TEXT = "Built with ♥🦀 & Rust in progress";

export function TypingAnimation() {
  const [display, setDisplay] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const indexRef = useRef(0);
  const modeRef = useRef<"typing" | "deleting" | "paused">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const isRunningRef = useRef(true);

  // ✅ Pre-compute class untuk SETIAP index berdasarkan FULL text
  const charClasses = useMemo(() => {
    const classes: string[] = new Array(FULL_TEXT.length).fill("text-text");

    for (let i = 0; i < FULL_TEXT.length; i++) {
      if (FULL_TEXT[i] === "♥") classes[i] = "typing-heart";
      if (FULL_TEXT[i] === "🦀") classes[i] = "typing-crab";
    }

    // Tandai seluruh kata "Rust" (4 karakter)
    const rustIdx = FULL_TEXT.indexOf("Rust");
    if (rustIdx !== -1) {
      for (let i = 0; i < 4; i++) {
        classes[rustIdx + i] = "typing-rust";
      }
    }

    return classes;
  }, []);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const stopTimer = setTimeout(() => {
      isRunningRef.current = false;
      setShowCursor(false);
      clear();
    }, 120000);

    const tick = () => {
      if (!isRunningRef.current) return;

      const idx = indexRef.current;
      const mode = modeRef.current;

      if (mode === "typing") {
        if (idx < FULL_TEXT.length) {
          setDisplay(FULL_TEXT.slice(0, idx + 1));
          indexRef.current = idx + 1;
          timeoutRef.current = setTimeout(tick, 70 + Math.random() * 30);
        } else {
          modeRef.current = "paused";
          timeoutRef.current = setTimeout(() => {
            modeRef.current = "deleting";
            tick();
          }, 800);
        }
      } else if (mode === "deleting") {
        if (idx > 0) {
          setDisplay(FULL_TEXT.slice(0, idx - 1));
          indexRef.current = idx - 1;
          timeoutRef.current = setTimeout(tick, 40);
        } else {
          modeRef.current = "typing";
          timeoutRef.current = setTimeout(tick, 400);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 500);

    return () => {
      clearTimeout(stopTimer);
      clear();
    };
  }, [clear]);

  return (
    <span className='typing-animation'>
      {display.split("").map((char, i) => (
        <span key={`char-${i}`} className={charClasses[i]}>
          {char}
        </span>
      ))}
      {showCursor && <span className='typing-cursor'>|</span>}
    </span>
  );
}
