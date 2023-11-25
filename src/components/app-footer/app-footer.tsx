import { FaMailBulk, FaPhone, FaTelegram, FaWhatsapp } from "react-icons/fa";
import styles from "./app-footer.module.css";

function AppFooter() {
  return (
    <footer className={`${styles.footer} `}>
      {" "}
      <div className={styles.footerContainer}>
        <p className={`${styles.text} `}>2023 год</p>
        {/* <div className={styles.contactBox}>
          <a className={styles.contactpageContacts} href="tel:+79033883601">
            <FaPhone /> +7 903 388 36 01
          </a>
          <a
            className={styles.contactpageContacts}
            href="https://wa.me/79033883601?text=Я%20хочу%20в%20узнать%20про%20дизайн%20интерьера"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            className={styles.contactpageContacts}
            href="https://t.me/LJinterior"
          >
            <FaTelegram /> Telegram
          </a>

          <a
            className={styles.contactpageContacts}
            href="mailto:ljinterior@mail.ru"
          >
            <FaMailBulk /> E-mail
          </a>
        </div> */}
      </div>
    </footer>
  );
}

export default AppFooter;
