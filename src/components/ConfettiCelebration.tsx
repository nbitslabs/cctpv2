"use client";

import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";

interface ConfettiCelebrationProps {
  isCompleted: boolean;
}

export default function ConfettiCelebration({
  isCompleted,
}: ConfettiCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Show confetti when transaction is completed
  useEffect(() => {
    if (isCompleted && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [isCompleted, showConfetti]);

  if (!showConfetti || width === 0 || height === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0">
      <Confetti width={width} height={height} />
    </div>
  );
}
