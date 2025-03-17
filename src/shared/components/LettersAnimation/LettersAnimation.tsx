import wrapText from '@shared/wrap-text';
import { useEffect, useRef } from 'react';

import styles from './LettersAnimation.module.css';

const numLetters = 100;

interface LettersAnimationProps {
  sentence: string;
  isButtonClicked: boolean;
}

export function LettersAnimation({ sentence, isButtonClicked }: LettersAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const letterWidth = 16;
  const sentenceLength = sentence.length;
  const initialPositions = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!sentence || !sentence.length) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initialPositions.current = Array.from({ length: sentenceLength }, (_, index) => {
      const targetX = canvas.width / 2 - (sentenceLength * letterWidth) / 2 + index * letterWidth;
      const targetY = canvas.height / 2;
      return { x: targetX, y: targetY };
    });

    const textSplitted = wrapText(ctx, sentence, 0, 0, window.innerWidth / 2, 40).map((row) => row.text.split(''));

    console.log(textSplitted);

    const letters = Array.from({ length: numLetters }, (_, index) => {
      const letter = sentence[index % sentenceLength];
      const flatSplitRowWithIndex = textSplitted
        .map((row, index) =>
          row.map((char) => ({
            char,
            index,
          })),
        )
        .flat();

      console.log('flatSplitRowWithIndex', flatSplitRowWithIndex);

      return {
        char: letter,
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() + 0.5,
        targetX: initialPositions.current[index % sentenceLength]?.x || 0,
        targetY:
          (initialPositions.current[index % sentenceLength]?.y || 0) +
          (flatSplitRowWithIndex[index % sentenceLength]?.index + 1 || 0) * 40,
        reachedTarget: false,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        isDuplicate: index / sentenceLength > 1,
      };
    });

    const animate = () => {
      let allReached = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      if (!ctx.font.includes('TT Travels Next Trl')) {
        ctx.font = `16px TT Travels Next Trl`;
      }
      ctx.textAlign = 'center';

      letters.forEach((letter) => {
        if (!isButtonClicked) {
          letter.y += letter.speed;
          letter.rotation += letter.rotationSpeed;
        } else {
          letter.opacity = 1;
          letter.rotation = 0;
          letter.rotationSpeed = 0;

          const targetX = letter.targetX;
          const targetY = letter.targetY;

          const dx = targetX - letter.x;
          const dy = targetY - letter.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 5) {
            allReached = false;
            letter.x += (dx / distance) * 5;
            letter.y += (dy / distance) * 5;
          } else {
            letter.reachedTarget = true;
            letter.x = targetX;
            letter.y = targetY;
          }
        }

        ctx.save();
        ctx.translate(letter.x, letter.y);
        ctx.rotate(letter.rotation);

        ctx.globalAlpha = letter.opacity;
        if (!letter.isDuplicate) ctx.fillText(letter.char, 0, 0);
        ctx.restore();

        if (!isButtonClicked && letter.y > canvas.height) {
          letter.y = Math.random() * -canvas.height;
          letter.x = Math.random() * canvas.width;
          letter.rotation = Math.random() * Math.PI * 2;
        }
      });

      if (!isButtonClicked || !allReached) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, [sentence, isButtonClicked, sentenceLength]);

  return (
    <div className={styles.lettersAnimation}>
      <canvas ref={canvasRef} className={styles.lettersAnimation}></canvas>
    </div>
  );
}
