import { useAppState } from '@stores/app';

import styles from './App.module.css';
import { DayMode } from './components/Modes/DayMode/DayMode';
import { NightMode } from './components/Modes/NightMode/NightMode';

function App() {
  const { currentMode } = useAppState();

  return (
    <section className={styles.main}>
      {currentMode === 'day' ? <DayMode /> : null}
      {currentMode === 'night' ? <NightMode /> : null}
    </section>
  );
}

export default App;
