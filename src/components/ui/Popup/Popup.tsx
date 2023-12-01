import { useClickAway } from '@uidotdev/usehooks'
import { FC, useEffect } from 'react'
import { MdClose } from 'react-icons/md'

import styles from './Popup.module.scss'

interface IPopup {
  children: JSX.Element
  setIsOpen: (isOpen: boolean) => void
}

const Popup: FC<IPopup> = ({ children, setIsOpen }) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

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
        <div className={styles.content}> {children} </div>
      </div>
    </section>
  )
}

export default Popup
