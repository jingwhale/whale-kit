import styles from './generatecover.css';
import GenerateCoverUI from "./componet/generatecover/index.js"

export default function() {
  return (
    <div className={styles.normal}>
      <GenerateCoverUI />
    </div>
  );
}
