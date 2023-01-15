
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { LabelSelect } from "./label-select.jsx"
import { SortSelect } from "./sort-select.jsx"

export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleCheckbox({ target }) {
        const { checked } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, inStock: checked }))
    }

    function onLabelChange(selectedLabels) {
        console.log('selectedLabels', selectedLabels)
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            labels: selectedLabels,
        }))
    }

    function onSortChange(selectedSort) {
        console.log('selectedSort', selectedSort)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, sortBy: selectedSort }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }



    return <section className="toy-filter side-bar">
        <form onSubmit={onSubmitFilter}>
            <h2>Toys Filter</h2>
            <label htmlFor="name">name</label>
            <input type="text"
                className="filter-input"
                id="name"
                name="txt"
                placeholder="By name"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price</label>
            <input type="number"
                className="filter-input"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <LabelSelect onLabelChange={onLabelChange} />
            {/* <SortSelect onSortChange={onSortChange} /> */}

            <label htmlFor="inStock">In stock</label>
            <input type="checkbox"
                className="filter-input checkbox"
                id="inStock"
                name="inStock"
                checked={filterByToEdit.inStock}
                onChange={handleCheckbox}
            />

            <button hidden>Filter</button>
        </form>

    </section>
}