import styles from './styles.module.css'

type ResultsListProps = {
  searchedValue: string
  loading?: boolean
  results?: {
    uid: string
    text: string
    onClick?: () => void
  }[]
}

const applyHighlightToText = (text: string, subtext: string): string => {
  const regex = new RegExp(subtext, 'i')
  
  if(regex.test(text)) {
    return text.replace(regex,`<b class=${styles.highlightedText}>$&</b>`)
  }
  
  return text
}

const ResultsList = ({loading, results, searchedValue}: ResultsListProps) => {
  if(searchedValue && loading) return (
    <div className={styles.wrapper}>
      <div className={styles.statusBox}>
        <span className={styles.loadingSpinner} />
      </div>
    </div>
  )

  if(searchedValue && !loading && results?.length === 0) return (
    <div className={styles.wrapper}>
      <div className={styles.statusBox}>
        <span className={styles.notFoundText}>No movie has been found</span>
      </div>
    </div>
  )

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {results?.map(item => (
          <li
            key={item.uid}
            onClick={item.onClick}
            className={styles.listItem}
            dangerouslySetInnerHTML={{__html: applyHighlightToText(item.text, searchedValue)}}
            >
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default ResultsList