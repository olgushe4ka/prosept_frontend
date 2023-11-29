import { useClickAway } from '@uidotdev/usehooks'
import { FC } from 'react'
import { MdClose } from 'react-icons/md'
import styles from './popup.module.css'

interface IPopup {
  children: JSX.Element
  setIsOpen: (isOpen: boolean) => void
}

const Popup: FC<IPopup> = ({ children, setIsOpen }) => {
  let ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  return (
    <section className={styles.wrapper}>
      <div className={styles.popup} ref={ref}>
        <button
          className={styles.close}
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <MdClose />
        </button>
        {children}
      </div>
    </section>
  )
}

export default Popup
