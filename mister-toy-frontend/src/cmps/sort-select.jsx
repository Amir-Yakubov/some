import React from 'react';
import CreatableSelect from 'react-select/creatable';

export function SortSelect({ onSortChange }) {

    const options = [
        { value: 'All', label: 'All', isFixed: true },
        { value: 'lowPrice', label: 'Price: Low to High' },
        { value: 'highPrice', label: 'Price: High to Low' },
        { value: 'createdAt', label: 'Newest Arrivals' },
    ]

    function handleChange(...props) {
        const { value } = props[0]
        onSortChange(value)
    }

    return <>
        <h3 className="sort-select">Sort By</h3>
        <CreatableSelect isClearable options={options}
            onChange={handleChange} />
    </>
}


