import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Whale! Fast interactive prototyping system!</h1>
      { props.children }
    </div>
  );
}

export default BasicLayout;
