import { Header } from '@app/components/Header/Header';
import { LettersAnimationGSAP } from '@shared/components/LettersAnimationGSAP/LettersAnimationGSAP';
import { usePrediction } from '@shared/hooks/usePrediction';
import { MOON_VIDEO_TIMINGS } from '@shared/moon-video-timings';
import { getMoonPhaseString } from '@shared/sun-moon-data';
import { useRef, useState } from 'react';

import styles from './MoonAwaiting.module.css';

export function MoonAwaitingPage() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showToTheMoonButton, setShowToTheMoonButton] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [animationTime, setAnimationTime] = useState(0);

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
        <LettersAnimationGSAP sentence={prediction} isButtonClicked={isButtonClicked} animationTime={animationTime} />
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

                setTimeout(
                  () => {
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

                    setTimeout(
                      () => {
                        setShowToTheMoonButton(true);
                      },
                      (stopTime - videoElement.currentTime - 0.5) * 1000,
                    );
                  },
                  (stopTime - videoElement.currentTime) * 1000,
                );
              }}
            >
              <span>получить подсказку</span>
            </button>
          ) : null}
          {showToTheMoonButton ? (
            <button className={`${styles.tipButton} ${styles.toTheMoonButton}`}>
              <span>на Луну!</span>
            </button>
          ) : null}
        </div>
      </main>
    </div>
  );
}
