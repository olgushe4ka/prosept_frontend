import styles from './app-footer.module.css'

function AppFooter() {
  return (
    <footer className={`${styles.footer} `}>
      {' '}
      <div className={styles.footerContainer}>
        <p className={`${styles.text} `}>2023 год</p>
      </div>
    </footer>
  )
}

export default AppFooter
