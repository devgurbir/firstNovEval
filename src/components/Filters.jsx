import React, {useState} from 'react'

function Filters(){
    const [formData, setFormData] = useState({
        year: "",
        make: "",
        sort: ""
    })
    return(
        <input value={} placeholder="Filter by year"></input>
    )
}

export default Filters