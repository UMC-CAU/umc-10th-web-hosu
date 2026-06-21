import { useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY

interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  overview: string
  vote_average: number
}

interface SearchResponse {
  results: Movie[]
}

const LANGUAGES = [
  { code: 'ko-KR', label: '한국어' },
  { code: 'en-US', label: 'English' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'zh-CN', label: '中文' },
]

function App() {
  const [query, setQuery] = useState('')
  const [includeAdult, setIncludeAdult] = useState(false)
  const [language, setLanguage] = useState('ko-KR')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        query: query.trim(),
        include_adult: String(includeAdult),
        language,
      })
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?${params}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const data: SearchResponse = await res.json()
      setMovies(data.results)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="search-area">
        <form onSubmit={(e) => { e.preventDefault(); void handleSearch() }}>
          <div className="form-top">
            <div className="form-group">
              <label>🎬 영화 제목</label>
              <input
                type="text"
                placeholder="영화 제목을 입력하세요"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>⚙️ 옵션</label>
              <div className="checkbox-row">
                <input
                  type="checkbox"
                  id="adult"
                  checked={includeAdult}
                  onChange={e => setIncludeAdult(e.target.checked)}
                />
                <label htmlFor="adult">성인 콘텐츠 표시</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>🌐 언어</label>
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading}>
            🔍 {loading ? '검색 중...' : '검색하기'}
          </button>
        </form>
      </div>

      {movies.length > 0 && (
        <div className="movie-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className="poster-wrap">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="no-poster">포스터 없음</div>
                )}
                <span className="rating">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="card-info">
                <h3>{movie.title}</h3>
                <p className="date">{movie.release_date}</p>
                <p className="overview">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
