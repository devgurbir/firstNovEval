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
    const [selectedCarId, setSelectedCarId] = useState(0);

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

    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        phone: ""
    })

    const personalInfoFormChange = (e) => {
        const {name, value} = e.target;
        setPersonalInfo({...personalInfo, [name]: value})
    }

    const [carBought, setCarBought] = useState(false)

    const submitPersonalInfo = async () => {
        const data = {
            carId: selectedCarId,
            userName: personalInfo.name,
            userPhone: personalInfo.phone,
            transactionTime: Date.now().toString()
        }
        const res = await axios.post("http://localhost:3000/orders", {
            carId: selectedCarId,
            userName: personalInfo.name,
            userPhone: personalInfo.phone,
            transactionTime: Date.now().toString()          
        } 
        
        )

            
        if(res){
            setCarBought(true);
            setBuyNow(false)
        }
        
    }

    if(isLoading){
        return (
            <h3>...Loading</h3>
        )
    }

    return(
        <>
        <Filters onChange = {handleFormChange} formData = {formData} filterFunction = {applyFilters} />
        {carBought && <h4 style={{margin: "10", color: "green"}}>Congratulations, you just bought a car</h4>}
        <div className = {styles.carListings}>
            {cars.map( car => <Car buyNowFn = {buyNowFn} key={car.id} carData={car} />)}
        </div>
        {isBuyNow && <BuyNowModal personalInfo = {personalInfo} submitInfo = {submitPersonalInfo} handleForm = {personalInfoFormChange} />}
        </>
    )
}

export default CarListings