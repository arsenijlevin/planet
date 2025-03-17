import { Header } from '@/app/components/Header/Header';
import { LettersAnimationGSAP } from '@shared/components/LettersAnimationGSAP/LettersAnimationGSAP';
import { usePrediction } from '@shared/hooks/usePrediction';
import { MOON_VIDEO_TIMINGS } from '@shared/moon-video-timings';
import { getMoonPhaseString } from '@shared/sun-moon-data';
import { useRef, useState } from 'react';

import styles from './MoonAwaiting.module.css';

export function MoonAwaitingPage() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [animationTime, setAnimationTime] = useState(0);

  const prediction = usePrediction();

  return (
    <main className={styles.moonAwaiting}>
      <LettersAnimationGSAP sentence={prediction} isButtonClicked={isButtonClicked} animationTime={animationTime} />
      <Header mode="night" />
      <div className={styles.heading}>
        <h1>Луна-парк</h1>
        <span>отгадайте 5 вопросов</span>
      </div>
      <div className={styles.moonAnimation}>
        <video autoPlay loop muted ref={videoRef}>
          <source src="moon.mov"></source>
          <source src="moon.webm"></source>
        </video>
      </div>
      <div className={styles.tipButton}>
        {!isButtonClicked ? (
          <button
            onClick={() => {
              setIsButtonClicked(true);

              const videoElement = videoRef.current;

              if (!videoElement) return;

              videoElement.playbackRate = 3;

              const stopTime = MOON_VIDEO_TIMINGS[getMoonPhaseString()];

              setAnimationTime(stopTime - videoElement.currentTime);

              videoElement.addEventListener('timeupdate', () => {
                const timeLeft = stopTime - videoElement.currentTime;

                console.log('timeLeft', timeLeft);

                if (timeLeft < 0.5) {
                  videoElement.playbackRate = 1;
                } else if (timeLeft < 1) {
                  videoElement.playbackRate = 1.5;
                } else if (timeLeft < 1.5) {
                  videoElement.playbackRate = 2;
                }

                if (videoElement.currentTime >= stopTime) {
                  videoElement.pause();
                }
              });
            }}
          >
            <span>получить подсказку</span>
          </button>
        ) : null}
      </div>
    </main>
  );
}
