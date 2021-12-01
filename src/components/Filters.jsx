import React, {useState} from 'react'

function Filters({formData, onChange, filterFunction}){    
    return(
        <>
        <input value={formData.year} placeholder="Filter by year" name="year" onChange={onChange} />
        <input value={formData.make} placeholder="Filter by make" name="make"  onChange={onChange} />
        <select value={formData.sort} name="_order" onChange={onChange}>
            <option value="asc">Sort Prices Low To High </option>
            <option value="desc">Sort Prices High To Low </option>
        </select>
        <button onClick = {filterFunction}>Apply Filters</button>
        </>
    )
}

export default Filters