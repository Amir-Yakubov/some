import React from 'react'

import Select from 'react-select'


export function LabelSelect({ onLabelChange }) {

    const colourOptions = [
        { value: 'Doll', label: 'Doll', isFixed: true },
        { value: 'Battery Powered', label: 'Battery Powered' },
        { value: 'Baby', label: 'Baby' },
        { value: 'outdoor', label: 'outdoor' },
        { value: 'On wheels', label: 'On wheels' },
        { value: 'Box game', label: 'Box game' },
        { value: 'Thinking game', label: 'Thinking game' }
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