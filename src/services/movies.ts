import moviesData from '../data/moviesData'

export type MovieDto = {
  Title: string
}

export const getMovies = async (search: string = '') => {
  try {
    const req = new Promise<MovieDto[]>((resolve) => {
      setTimeout(() => {
        resolve(moviesData.filter(movie => {
          const regex = new RegExp(search, 'i')
          return regex.test(movie.Title)
        }))
      }, 500)
    })

    const sortedData = (await req).sort((a, b) => a.Title > b.Title ? 1 : -1)
    
    return sortedData
  } catch(err) {
    console.error('Get movies request:', err)
    return null
  }
}