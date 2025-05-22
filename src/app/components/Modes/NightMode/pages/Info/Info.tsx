import imageMain from '@assets/planets-2d-dark.png';
import { useNightModeStore } from '@stores/night-mode';

import styles from './Info.module.css';

export function Info() {
  const { setCurrentPage } = useNightModeStore();

  return (
    <main className={styles.content}>
      <div className={styles.heading}>
        {/* Заголовки */}
        <h2>MANIPULAZIONE INTERNAZIONALE</h2>
        <h1>Парад планет</h1>
        <button
          onClick={() => {
            setCurrentPage('start');
          }}
        >
          <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.786563 3.45H11.1186V4.444H0.786563V3.45ZM12.5236 5.998L16.7516 3.688L12.5236 1.294V0.16L17.8436 3.142V4.15L12.5236 7.132V5.998Z"
              fill="#ffffff"
            />
          </svg>
          <span>на главную</span>
        </button>
      </div>
      <div className={styles.imageMain}>
        <img src={imageMain} alt="Планеты" />
      </div>
      <div className={styles.text}>
        <p>
          Композиция составлена как выставка разнообразия мира ВСЕЛЕННОЙ в доступной для человека форме - группа
          напольных кашпо с выставленными на них планетами.
        </p>
        <br />
        <p>
          Форма кашпо повторяет форму СПУТНИКА, что связывает в единую смысловую и визуальную цепочку два понятия
          ВСЕЛЕННАЯ и СПУТНИК.
        </p>
      </div>
    </main>
  );
}
