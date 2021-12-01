import styles from "./BuyNowModal.module.css"
import React, {useState} from 'react'

function BuyNowModal({submitInfo}){
    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        phone: ""
    })

    const personalInfoFormChange = (e) => {
        const {name, value} = e.target;
        setPersonalInfo({...personalInfo, [name]: value})
    }

    return (
        <div className={styles.buyNowModal}>
            <input value={personalInfo.name} placeholder="enter name" name="name" onChange={personalInfoFormChange} />
            <input value={personalInfo.phone} placeholder="enter phone" name="phone" onChange={personalInfoFormChange}/>  
            <button onClick = { () => submitInfo(personalInfo.name, personalInfo.phone) }>Buy Your Car</button>
        </div>
    )
}

export default BuyNowModal