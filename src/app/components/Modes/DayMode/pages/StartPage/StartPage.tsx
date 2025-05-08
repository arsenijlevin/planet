import { useDayModeStore } from '@/stores/day-mode';
import moonIcon from '@assets/moon.svg';
import nlLogo from '@assets/nl-logo.png';
import imageMain from '@assets/planets-2d.png';
import samoletLogo from '@assets/samolet-logo.png';
import sputnikLogo from '@assets/sputnik-logo.png';
import sunIcon from '@assets/sun.svg';

import styles from './StartPage.module.css';

export function StartPage() {
  const { setCurrentPage, quiz } = useDayModeStore();

  return (
    <>
      <main className={styles.content}>
        <div className={styles.heading}>
          {/* Заголовки */}
          <h2>MANIPULAZIONE INTERNAZIONALE</h2>
          <h1>Парад планет</h1>
          <button
            onClick={() => {
              setCurrentPage('info');
            }}
          >
            <span>подробнее о проекте</span>
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.786563 3.45H11.1186V4.444H0.786563V3.45ZM12.5236 5.998L16.7516 3.688L12.5236 1.294V0.16L17.8436 3.142V4.15L12.5236 7.132V5.998Z"
                fill="#262639"
              />
            </svg>
          </button>
        </div>
        <div className={styles.imageMain}>
          <img src={imageMain} alt="Планеты" />
        </div>
        <div className={styles.logos}>
          {/* Логотипы */}
          <div>
            <img src={sputnikLogo} alt="" />
          </div>
          <div>
            <img src={samoletLogo} alt="" />
          </div>
          <div>
            <img src={nlLogo} alt="" />
          </div>
        </div>
        <div className={styles.buttons}>
          {/* Кнопки */}
          <button
            className={styles.buttonLeft}
            onClick={() => {
              quiz.start();
            }}
          >
            <img src={sunIcon} alt="" />
            <span>планетариУМ</span>
          </button>
          <button className={styles.buttonRight} disabled>
            <img src={moonIcon} alt="" />
            <span>луна-парк</span>
          </button>
        </div>
      </main>
    </>
  );
}
