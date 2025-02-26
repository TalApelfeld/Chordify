import styles from "./LoginPage.module.css";
interface PianoProps {
  page: string;
}

export default function Piano({ page }: PianoProps) {
  return (
    <div>
      <ul className={page === "login" ? styles.set : styles.setsignup}>
        <li
          className={`${styles.white} ${styles.b} ${styles.li}`}
          onClick={() => {
            const audio = new Audio(`/assets/piano-mp3_A4.mp3`);
            audio.play();
          }}
        >
          <p className={styles.label}>A4</p>
        </li>

        <li className={`${styles.black} ${styles.as} ${styles.li}`}></li>

        <li
          className={`${styles.white} ${styles.a} ${styles.li}`}
          onClick={() => {
            const audio = new Audio(`/assets/piano-mp3_B4.mp3`);
            audio.play();
          }}
        >
          <p className={styles.label}>B4</p>
        </li>

        <li className={`${styles.black} ${styles.gs} ${styles.li}`}></li>

        <li
          className={`${styles.white} ${styles.g} ${styles.li}`}
          onClick={() => {
            const audio = new Audio(`/assets/piano-mp3_C4.mp3`);
            audio.play();
          }}
        >
          <p className={styles.label}>C4</p>
        </li>

        <li className={`${styles.black} ${styles.fs} ${styles.li}`}></li>

        <li
          className={`${styles.white} ${styles.f} ${styles.li}`}
          onClick={() => {
            const audio = new Audio(`/assets/piano-mp3_D4.mp3`);
            audio.play();
          }}
        >
          <p className={styles.label}>D4</p>
        </li>

        <li
          className={`${styles.white} ${styles.e} ${styles.li}`}
          onClick={() => {
            const audio = new Audio(`/assets/piano-mp3_E4.mp3`);
            audio.play();
          }}
        >
          <p className={styles.label}>E4</p>
        </li>

        <li className={`${styles.black} ${styles.ds} ${styles.li}`}></li>

        <li
          className={`${styles.white} ${styles.d} ${styles.li}`}
          onClick={() => {
            const audio = new Audio(`/assets/piano-mp3_F4.mp3`);
            audio.play();
          }}
        >
          <p className={styles.label}>F4</p>
        </li>

        <li className={`${styles.black} ${styles.cs} ${styles.li}`}></li>

        <li
          className={`${styles.white} ${styles.c} ${styles.li}`}
          onClick={() => {
            const audio = new Audio(`/assets/piano-mp3_G4.mp3`);
            audio.play();
          }}
        >
          <p className={styles.label}>G4</p>
        </li>
      </ul>
    </div>
  );
}
