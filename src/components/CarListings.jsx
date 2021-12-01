import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Car from "./Car"
import styles from "./CarListings.module.css"
import Filters from './Filters'

function CarListings(){
    const [cars, setCars] = useState([])    
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [formData, setFormData] = useState({
        year: "",
        make: "",
        __order: ""
    })

    const fetchCars = async () => {
        try{
            let paramObj = {"__sort": "price"};
            setIsLoading(true);
            for(let key in formData){
                if(formData[key]){
                    paramObj[key] = formData[key]
                }
            }
            console.log(paramObj)
            const data = await axios("http://localhost:3000/cars", {
                params: paramObj
            }).then(res => res.data)
            setCars(data)
        }
        catch{
            setIsError(true)
        }
        finally{
            setIsLoading(false)
        }
        
    }

    useEffect( () => {     
        fetchCars();
    }, [])

    

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const applyFilters = () => {
        fetchCars();
    }

    return(
        <>
        <Filters onChange = {handleFormChange} formData = {formData} filterFunction = {applyFilters} />
        <div className = {styles.carListings}>
            {cars.map( car => <Car key={car.id} carData={car} />)}
        </div>
        </>
    )
}

export default CarListings