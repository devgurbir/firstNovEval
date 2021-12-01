import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Car from "./Car"
import styles from "./CarListings.module.css"

function CarListings(){
    const [cars, setCars] = useState([])    
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect( () => {
        const fetchCars = async () => {
            try{
                setIsLoading(true);
                const data = await axios("http://localhost:3000/cars").then(res => res.data)
                setCars(data)
            }
            catch{
                setIsError(true)
            }
            finally{
                setIsLoading(false)
            }
            
        }

        fetchCars();
    }, [])

    return(
        <div className = {styles.carListings}>
            {cars.map( car => <Car key={car.id} carData={car} />)}
        </div>
    )
}

export default CarListings