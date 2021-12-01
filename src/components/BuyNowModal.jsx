import styles from "./BuyNowModal.module.css"
import React, {useState} from 'react'

function BuyNowModal({submitInfo, handleForm, personalInfo}){
    

    return (
        <div className={styles.buyNowModal}>
            <input value={personalInfo.name} placeholder="enter name" name="name" onChange={handleForm} />
            <input value={personalInfo.phone} placeholder="enter phone" name="phone" onChange={handleForm}/>  
            <button onClick = { () => submitInfo(String(personalInfo.name), String(personalInfo.phone)) }>Buy Your Car</button>
        </div>
    )
}

export default BuyNowModal