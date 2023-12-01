import styles from './app-footer.module.css'

function AppFooter() {
  return (
    <footer className={`${styles.footer} `}>
      <div className={styles.footerContainer}>
        <p className={`${styles.text} `}>
          © {String(new Date().getFullYear())}, PROSEPT
        </p>
      </div>
    </footer>
  )
}

export default AppFooter
