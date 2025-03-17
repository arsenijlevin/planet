import { useDayModeStore } from '@/stores/day-mode';
import nlLogo from '@assets/nl-logo.png';
import imageMain from '@assets/planets-3d-light.png';
import samoletLogo from '@assets/samolet-logo.png';
import sputnikLogo from '@assets/sputnik-logo.png';

import styles from './StartPage.module.css';

export function StartPage() {
  const { start: startQuiz } = useDayModeStore((state) => state.quiz);

  return (
    <>
      <div className={styles.background}></div>
      <main className={styles.content}>
        <div className={styles.heading}>
          {/* Заголовки */}
          <h1>Парад планет</h1>
          <h2>MANIPULAZIONE INTERNAZIONALE</h2>
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
              startQuiz();
            }}
          >
            <span>планетариум</span>
          </button>
          <button className={styles.buttonRight} disabled>
            <span>луна-парк</span>
          </button>
        </div>
      </main>
    </>
  );
}
