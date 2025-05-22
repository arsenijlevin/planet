import gsap from 'gsap';

export function getAnimationStartValues(validLetters: unknown[]): {
  x: (i: number) => number;
  y: (i: number) => number;
  rotation: (i: number) => number;
  skewX: (i: number) => number;
} {
  const xStart = validLetters.map(() => {
    const side = Math.random() < 0.5 ? -1 : 1;

    return side * (window.innerWidth * 1.01);
  });
  const yStart = validLetters.map(() => gsap.utils.random(-window.innerHeight / 2, window.innerHeight / 2));
  const rotationStart = validLetters.map(() => gsap.utils.random(-180, 180));
  const skewXStart = validLetters.map(() => gsap.utils.random(-20, 20));

  return {
    x: (i: number) => xStart[i],
    y: (i: number) => yStart[i],
    rotation: (i: number) => rotationStart[i],
    skewX: (i: number) => skewXStart[i],
  };
}
