import moonIcon from '@assets/moon.svg';
import sunIcon from '@assets/sun.svg';
import { useAppState } from '@stores/app';
import Favicon from 'react-favicon';

import styles from './App.module.css';
import { DayMode } from './components/Modes/DayMode/DayMode';
import { NightMode } from './components/Modes/NightMode/NightMode';

function App() {
  const { currentMode } = useAppState();

  return (
    <>
      <Favicon url={currentMode === 'night' ? moonIcon : sunIcon} />
      <section className={styles.main}>
        {currentMode === 'day' ? <DayMode /> : null}
        {currentMode === 'night' ? <NightMode /> : null}
      </section>
    </>
  );
}

export default App;
