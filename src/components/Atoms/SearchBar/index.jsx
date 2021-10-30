import { useState, useEffect, useContext, useRef } from 'react'
import { FilterContext } from '../../../contexts/filter'

import searchIcon from '../../../assets/search.svg'

import styles from './styles.module.scss'

export const SearchBar = () => {
  const notInitialRender = useRef(false)

  const [searchText, setSearchText] = useState('')
  const { filterEmployees } = useContext(FilterContext)

  useEffect(() => {
    if (notInitialRender.current) {
      filterEmployees(searchText)
    } else {
      notInitialRender.current = true
    }

  }, [searchText])

  return (
    <div className={styles.searchbarWrapper}>
      <label className={styles.searchLabel} htmlFor="search"></label>
      <input
        id="search"
        onChange={event => setSearchText(event.target.value)}
        className={styles.searchInput}
        type="text"
        placeholder="Pesquisar"
        value={searchText}
      />
      <button className={styles.searchButton} type="submit">
        <img src={searchIcon} alt="" />
      </button>
    </div>
  )
}
