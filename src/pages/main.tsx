import MyDropdown from "../components/menu/menu";
import styles from "./mainPage-styles.module.css";
import ItemFromItemsList from "../components/items-list/items-list";
import { itemsList } from "../utils/fakeData";
import MiniBrowser from "../components/mini-browser/mini-browser";
import { useEffect, useState } from "react";

interface SelectedItem {
  name: string;
  link: string;
}

function MainPage() {
  const items = [
    { value: "Шампунь", label: "Шампунь" },
    { value: "Мыло", label: "Мыло" },
    { value: "Антисептик", label: "Антисептик" },
  ];

  const handleSelect = (item: string) => {
    console.log(`Выбран товар: ${item}`);
  };

  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>({
    name: itemsList[0].name,
    link: itemsList[0].link,
  });

  console.log(selectedItem);

  const handleSelectItem = (item: string, link: string) => {
    setSelectedItem({ name: item, link: link });
  };

  return (
    <div className={styles.app}>
      <div className={styles.myDropdown}>
        <MyDropdown items={items} onSelect={handleSelect} />
      </div>
      <div className={styles.main}>
        <div className={styles.block1}>
          <h3>Список позиций:</h3>
          {itemsList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectItem(item.name, item.link)}
            >
              <ItemFromItemsList item={item.name} />{" "}
            </div>
          ))}
        </div>
        <div className={styles.block2AndButtons}>
          <div className={styles.block2}>
            {selectedItem && <MiniBrowser initialUrl={selectedItem.link} />}
          </div>
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
