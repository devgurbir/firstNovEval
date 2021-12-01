import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Car from "./Car"
import styles from "./CarListings.module.css"
import Filters from './Filters'
import BuyNowModal from "./BuyNowModal"

function CarListings(){
    const [cars, setCars] = useState([])    
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isBuyNow, setBuyNow] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);

    const [formData, setFormData] = useState({
        year: "",
        make: "",
        _order: ""
    })

    const fetchCars = async () => {
        try{
            let paramObj = {"_sort": "price"};
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

    const buyNowFn = (id) => {
        setBuyNow(true)
        setSelectedCarId(id)
    }

    const submitPersonalInfo = async (name, phone) => {
        const data = {
            carId: selectedCarId,
            userName: name,
            userPhone: phone,
            transactionTime: Date.now().toString()
        }
        await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)            
        }
        )
    }

    if(isLoading){
        return (
            <h3>...Loading</h3>
        )
    }

    return(
        <>
        <Filters onChange = {handleFormChange} formData = {formData} filterFunction = {applyFilters} />
        <div className = {styles.carListings}>
            {cars.map( car => <Car buyNowFn = {buyNowFn} key={car.id} carData={car} />)}
        </div>
        {isBuyNow && <BuyNowModal submitInfo = {submitPersonalInfo} />}
        </>
    )
}

export default CarListings