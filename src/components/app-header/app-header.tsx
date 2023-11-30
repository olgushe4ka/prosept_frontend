import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import a from '../../images/prosept-logo.svg'
import headerStyles from './app-header.module.css'

function AppHeader() {
  const location = useLocation()
  const [activePage, setActivePage] = useState('Главная')

  useEffect(() => {
    // Определите активную страницу на основе URL
    switch (location.pathname) {
      case '/':
        setActivePage('Главная')
        break
      case '/extrapage':
        setActivePage('Extrapage')
        break
      default:
        setActivePage('')
        break
    }
  }, [location.pathname])

  return (
    <header className={`${headerStyles.header} pl-15 pr-15 pb-0 pt-0`}>
      <Link to="/" className={`${headerStyles.logo}`}>
        <img src={a} alt="логотип" width={100} />
      </Link>{' '}
      <div className={`${headerStyles.boxLeft}`}>
        {/* <Link
          to="/extrapage"
          className={`${headerStyles.menu} ${
            activePage === 'Extrapage' ? headerStyles.active : ''
          }`}
        >
          <p className={`${headerStyles.menuText}`}>Таблица</p>
        </Link> */}
        {/* <Link
          to="/"
          className={`${headerStyles.menu} ${
            activePage === 'Главная' ? headerStyles.active : ''
          }`}
        >
          <p className={`${headerStyles.menuText}`}>Разметка товаров</p>
        </Link> */}
        {/* <MyDropdown
          items={[]}
          onSelect={function (items: string | string[] | null): void {
            throw new Error('Function not implemented.')
          }}
          placeholder={'Выпадающее меню'}
        /> */}
        <span className={headerStyles.dropMenu}>
          Выпадающее меню <FaArrowDown />
        </span>
      </div>
    </header>
  )
}

export default AppHeader
