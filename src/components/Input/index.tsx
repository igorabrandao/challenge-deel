import styles from './styles.module.css'
import { ChangeEvent } from 'react'

type InputProps = {
  label?: string
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({label, ...props}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label &&
          <span className={styles.labelName}>{label}</span>
        }
        <input className={styles.input} {...props}/>
      </label>
    </div>
  )
}

export default Input
