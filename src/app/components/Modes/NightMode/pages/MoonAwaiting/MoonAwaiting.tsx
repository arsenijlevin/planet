import { Header } from '@app/components/Header/Header';
import { LettersAnimationGSAP } from '@shared/components/LettersAnimationGSAP/LettersAnimationGSAP';
import { usePrediction } from '@shared/hooks/usePrediction';
import { MOON_VIDEO_TIMINGS } from '@shared/moon-video-timings';
import { getMoonPhaseString } from '@shared/sun-moon-data';
import { useRef, useState } from 'react';

import styles from './MoonAwaiting.module.css';

export function MoonAwaitingPage() {
  const [showToTheMoonButton, setShowToTheMoonButton] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const prediction = usePrediction();

  return (
    <div className={styles.moonAwaitingWrapper}>
      <main className={styles.moonAwaiting}>
        <Header mode="night" />
        <div className={styles.heading}>
          <h1>Луна-парк</h1>
        </div>
        <div className={styles.moonAnimation}>
          <video autoPlay loop muted ref={videoRef}>
            <source src="moon.mov"></source>
            <source src="moon.webm"></source>
          </video>
        </div>
        <LettersAnimationGSAP text={prediction} isAnimationStarted={showToTheMoonButton} />
        <div className={styles.tipButton}>
          {!showToTheMoonButton ? (
            <button
              onClick={() => {
                const videoElement = videoRef.current;

                if (!videoElement) return;

                videoElement.playbackRate = 3;

                const stopTime = MOON_VIDEO_TIMINGS[getMoonPhaseString()];

                videoElement.addEventListener('timeupdate', () => {
                  const timeLeft = Math.abs(stopTime - videoElement.currentTime);

                  if (timeLeft < 0.5) {
                    videoElement.playbackRate = 1;
                  } else if (timeLeft < 1) {
                    videoElement.playbackRate = 1.5;
                  } else if (timeLeft < 1.5) {
                    videoElement.playbackRate = 2;
                  }

                  if (timeLeft <= 0.3) {
                    videoElement.pause();
                  }
                });

                setShowToTheMoonButton(true);
              }}
            >
              <span>получить подсказку</span>
            </button>
          ) : null}
          {showToTheMoonButton ? (
            <button>
              <span>на Луну!</span>
            </button>
          ) : null}
        </div>
      </main>
    </div>
  );
}
