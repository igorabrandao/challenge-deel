import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Input from './components/Input';
import ResultsList from './components/ResultsList';
import * as moviesService from './services/movies';

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [movies, setMovies] = useState<moviesService.MovieDto[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timeoutBeforeGetResults = setTimeout(() => {
      setLoading(true)
  
      moviesService.getMovies(searchValue)
        .then(data => setMovies(data))
        .catch(err => {
          console.log(err)
          setMovies(null)
        })
        .finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timeoutBeforeGetResults)
  }, [searchValue])

  return (
    <div className={styles.wrapper}>
      <Header />
      <Input
        label="Search Movies"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <ResultsList
        loading={loading}
        searchedValue={searchValue}
        results={(searchValue && movies) ? 
          movies.map(movie => ({
            text: movie.Title,
            uid: movie.Title
          })) : []
        }
      />
    </div>
  );
}

export default App;
