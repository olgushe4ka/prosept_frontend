import headerStyles from "./app-header.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import a from "../../images/logo.svg";

function AppHeader() {
  const location = useLocation();
  const [activePage, setActivePage] = useState("Главная");

  useEffect(() => {
    // Определите активную страницу на основе URL
    switch (location.pathname) {
      case "/":
        setActivePage("Главная");
        break;
      case "/extrapage":
        setActivePage("Extrapage");
        break;
      default:
        setActivePage("");
        break;
    }
  }, [location.pathname]);

  console.log(activePage);

  return (
    <header className={`${headerStyles.header} pl-15 pr-15 pb-0 pt-0`}>
      <div className={`${headerStyles.boxLeft}`}>
        <Link
          to="/extrapage"
          className={`${headerStyles.menu} ${
            activePage === "Extrapage" ? headerStyles.active : ""
          }`}
        >
          <p className={`${headerStyles.menuText}`}>Таблица</p>
        </Link>
        <Link
          to="/"
          className={`${headerStyles.menu} ${
            activePage === "Главная" ? headerStyles.active : ""
          }`}
        >
          <p className={`${headerStyles.menuText}`}>Разметка товаров</p>
        </Link>
      </div>
      <Link to="/" className={`${headerStyles.logo}`}>
        <img src={a} alt="логотип" width={100} />
      </Link>
    </header>
  );
}

export default AppHeader;
