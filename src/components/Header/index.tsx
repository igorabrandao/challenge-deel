import styles from './styles.module.css'
import icon from './icon.png'


const Header = () => {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.icon}
        src={icon}
        alt="movies finder icon"
      />
      <h1 className={styles.title}>Movies Finder</h1>
    </div>
  )
}

export default Header
