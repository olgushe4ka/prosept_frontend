import { Button } from "react-native";
import MyDropdown from "../components/menu/menu";
import styles from "./mainPage-styles.module.css";

function MainPage() {
  const items = [
    { value: "Шампунь", label: "Шампунь" },
    { value: "Мыло", label: "Мыло" },
    { value: "Антисептик", label: "Антисептик" },
  ];

  const handleSelect = (item: string) => {
    console.log(`Выбран товар: ${item}`);
  };

  return (
    <div className={styles.app}>
      <MyDropdown items={items} onSelect={handleSelect} />
      <div className={styles.main}>
        <div className={styles.block1}>Блок 1</div>
        <div className={styles.block2AndButtons}>
          <div className={styles.block2}>Блок 2</div>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() => console.log("Button pressed")}
            >
              Да
            </button>
            <button
              className={styles.button}
              onClick={() => console.log("Button pressed")}
            >
              Нет
            </button>
            <button
              className={styles.button}
              onClick={() => console.log("Button pressed")}
            >
              Отложить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
