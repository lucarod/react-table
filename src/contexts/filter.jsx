import { createContext, useState, useEffect } from "react";

import { api } from '../services/api'

import { formatEmployees, filterEmployees } from '../utils'

export const FilterContext = createContext({})

export const FilterProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [totalEmployees, setTotalEmployees] = useState([])
  const [employees, setEmployees] = useState([])

  function getFilteredEmployees(filterString) {
    const filteredEmployees = filterEmployees(filterString, totalEmployees)
    setEmployees(filteredEmployees)
  }

  useEffect(() => {
    api.get('employees')
      .then(response => {
        const formattedEmployees = formatEmployees(response.data)
        setTotalEmployees(formattedEmployees)
        setEmployees(formattedEmployees)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <FilterContext.Provider value={{ employees, getFilteredEmployees, isLoading }}>
      {props.children}
    </FilterContext.Provider>
  )
}
