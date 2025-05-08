import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import styles from './LettersAnimationGSAP.module.css';

interface LettersAnimationProps {
  sentence: string;
  isButtonClicked: boolean;
  animationTime: number;
}

export function LettersAnimationGSAP({ sentence, isButtonClicked, animationTime }: LettersAnimationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sentence || !containerRef.current || !isButtonClicked) return;

    const words = sentence.split(' '); // Split the sentence by spaces to get words
    const container = containerRef.current;

    if (!wordRefs.current.length) {
      // Create words as div elements and letters as span elements inside them
      words.forEach((word) => {
        const wordElement = document.createElement('div');
        wordElement.className = styles.word; // Apply word class

        // Create letters as span elements for the current word
        const letters = word.split('');
        letters.forEach((letter) => {
          const letterElement = document.createElement('span');
          letterElement.innerText = letter;
          letterElement.className = styles.letter;
          wordElement.appendChild(letterElement);
        });

        wordRefs.current.push(wordElement);
        container.appendChild(wordElement);
      });
    }

    // Create GSAP timeline for the falling animation
    const letterTimeline = gsap.timeline({ paused: false, repeat: -1 });

    // Falling animation for all letters
    wordRefs.current.forEach((wordElement) => {
      if (wordElement) {
        const lettersInWord = wordElement.querySelectorAll('span');
        lettersInWord.forEach((letterElement) => {
          if (letterElement) {
            letterTimeline.fromTo(
              letterElement,
              {
                opacity: 0.9,
                y: -window.innerHeight / 2 - 50, // Start position (above the screen)
                x: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2), // Random x-position
                rotation: gsap.utils.random(-180, 180),
                skewX: gsap.utils.random(-20, 20),
              },
              {
                opacity: 0.9,
                y: window.innerHeight, // Fall to below the screen
                rotation: gsap.utils.random(-360, 360),
                duration: gsap.utils.random(3, 6),
                ease: 'power1.inOut',
                delay: gsap.utils.random(0, 4), // Staggered start
                repeat: -1,
              },
              'start',
            );
          }
        });
      }
    });

    // When the button is clicked, letters come together to form the sentence
    if (isButtonClicked) {
      setTimeout(() => {
        wordRefs.current.forEach((wordElement) => {
          if (wordElement) {
            const lettersInWord = wordElement.querySelectorAll('span');
            gsap
              .to(lettersInWord, {
                x: () => {
                  // Position letters at their respective locations (default to center)
                  return 0;
                },
                y: 0, // Center the letters
                opacity: 0.9,
                rotation: 0,
                skewX: 0,
                duration: 2,
                ease: 'power4.out',
                stagger: 0.05, // Stagger the animation for each letter
              })
              .eventCallback('onStart', () => {
                letterTimeline.kill();

                console.log('styles.lettersAnimation', styles.lettersAnimation);

                const lettersContainer = document.querySelector<HTMLDivElement>(`.${styles.lettersContainer}`);

                if (lettersContainer) {
                  lettersContainer.style.height = 'fit-content';

                  if (window.innerWidth < 460) {
                    lettersContainer.style.margin = '400px auto 0 auto';
                  } else {
                    lettersContainer.style.margin = '500px auto 0 auto';
                  }
                }
                wordRefs.current.forEach((wordElement) => {
                  if (wordElement) {
                    const lettersInWord = wordElement.querySelectorAll('span');

                    lettersInWord.forEach((letterElement) => {
                      letterElement.style.position = 'static';
                    });
                  }
                });
              });
          }
        });
      }, animationTime * 1000);
    }

    // Cleanup timeline on component unmount
    return () => {
      letterTimeline.kill();
    };
  }, [sentence, isButtonClicked, animationTime]);

  return (
    <div className={styles.lettersAnimation}>
      <div className={styles.lettersContainer} ref={containerRef}>
        {/* Words and letters will be rendered here dynamically */}
      </div>
    </div>
  );
}
