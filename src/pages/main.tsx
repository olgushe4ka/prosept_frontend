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
    { value: "Краска", label: "Краска" },
    { value: "Шампунь", label: "Шампунь" },
    { value: "Мыло", label: "Мыло" },
    { value: "Антисептик", label: "Антисептик" },
  ];

  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [isDropdownItemSelected, setIsDropdownItemSelected] = useState(false);

  const handleSelectItem = (item: string, link: string) => {
    setSelectedItem({ name: item, link: link });
  };

  const handleDropdownSelect = (selectedValue: string) => {
    setIsDropdownItemSelected(true);
    // Handle any other logic related to dropdown selection
  };

  return (
    <div className={styles.app}>
      <MyDropdown items={items} onSelect={handleDropdownSelect} />
      {isDropdownItemSelected && (
        <div className={styles.main}>
          <div className={styles.block1}>
            <h3>Список позиций:</h3>
            {itemsList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item.name, item.link)}
                className={
                  selectedItem?.name === item.name ? styles.selectedItem : ""
                }
              >
                <ItemFromItemsList item={item.name} />
              </div>
            ))}
          </div>
          <div className={styles.block2AndButtons}>
            <div className={styles.block2}>
              {selectedItem && (
                <>
                  <a
                    href={selectedItem?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.block2}
                  >
                    Ссылка на товар
                  </a>
                  <MiniBrowser initialUrl={selectedItem.link} />{" "}
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
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
