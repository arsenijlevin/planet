import gsap from 'gsap';
import { useRef, useLayoutEffect, useEffect, useCallback } from 'react';

import { getAnimationStartValues } from './get-animation-start-values';
import styles from './LettersAnimationGSAP.module.css';

interface LettersAnimationProps {
  text: string;
  isAnimationStarted: boolean;
}

export function LettersAnimationGSAP({ text, isAnimationStarted }: LettersAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const addToRefs = useCallback(
    (el: HTMLSpanElement | null) => {
      if (text && el && !letterRefs.current.includes(el)) {
        letterRefs.current.push(el);
      }
    },
    [text],
  );

  const words = text.split(' ').map((word) => word.split(''));

  useLayoutEffect(() => {
    const validLetters = letterRefs.current.filter((el): el is HTMLSpanElement => !!el);

    if (validLetters.length === 0) return;

    const tl = gsap.timeline({ paused: true });

    const animationStartValues = getAnimationStartValues(validLetters);

    tl.fromTo(
      validLetters,
      {
        ...animationStartValues,

        opacity: 0.9,
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        skewX: 0,

        opacity: 0.9,

        duration: 2,
        ease: 'expo',
      },
      'start',
    ).eventCallback('onComplete', () => {
      if (!containerRef.current) return;

      containerRef.current.style.display = 'none';
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      containerRef.current.offsetHeight;
      containerRef.current.style.display = 'flex';
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, [text]);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (isAnimationStarted) {
      timelineRef.current.play();
    } else {
      timelineRef.current.pause();
    }
  }, [isAnimationStarted]);

  useEffect(() => {
    letterRefs.current = [];
  }, [text]);

  return (
    <div
      className={styles.lettersAnimation}
      style={{
        opacity: text ? 1 : 0,
      }}
    >
      <div className={styles.lettersContainer} ref={containerRef}>
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className={styles.word}>
            {word.map((letter, letterIndex) => (
              <span key={letterIndex} className={styles.letter} ref={addToRefs}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
