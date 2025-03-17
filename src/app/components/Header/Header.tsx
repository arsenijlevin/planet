import { Mode } from '@stores/app';

import stylesDay from './HeaderDay.module.css';
import stylesNight from './HeaderNight.module.css';

interface HeaderProps {
  mode: Mode;
}

export function Header(props: HeaderProps) {
  const styles = props.mode === 'night' ? stylesNight : stylesDay; // TODO: Fix to one file with changing css property

  return (
    <header>
      <div className={styles.circles}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.headerTitle}>
        <h4>Парад планет</h4>
      </div>
      <div className={styles.line}></div>
    </header>
  );
}
