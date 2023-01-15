import React from 'react'

import Select from 'react-select'


export function LabelSelect({ onLabelChange }) {

    const colourOptions = [
        { value: 'Doll', label: 'Doll', isFixed: true },
        { value: 'Battery Powered', label: 'Battery Powered' },
        { value: 'Baby', label: 'Baby' },
        { value: 'Outdoor', label: 'Outdoor' },
        { value: 'Lego', label: 'Lego' },
        { value: 'Board games', label: 'Board games' },
        { value: 'Minnie Mouse', label: 'Minnie Mouse' },
        { value: 'Marvel', label: 'Marvel' },
        { value: 'Action Figure', label: 'Action Figure' },
        { value: 'Super Mario', label: 'Super Mario' },
        { value: 'Video game', label: 'Video game' },
        { value: 'With Sound', label: 'With Sound' }
    ]

    function handleChange(...props) {
        // let { value, name: field, type } = target
        console.log('props', props)
        console.log('value', props[0])
        const labels = props[0].map((labelInfo) => labelInfo.value)
        console.log('labels', labels)
        onLabelChange(labels)
    }

    return (
        <div className="select-wrap">
            <h3 className="labels-label">Labels</h3>
            <Select
                defaultValue={''}
                isMulti
                name="colors"
                options={colourOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    )
}