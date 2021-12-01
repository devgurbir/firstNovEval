import React from 'react'
import styles from "./Car.module.css"

function Car({carData}){
    return (
        <div className={styles.car}>
            <div className={styles.carImage}>
                <img src={carData.image} alt={carData.name} />
            </div>
            <div className = {styles.carInfo}>
                <h2>{carData.name}</h2>
                <h4>Price: {carData.price}</h4>
                <div className = {styles.yeartype}>
                    <span><strong>Type:</strong> {carData.type}</span>
                    <span><strong>Year of Make:</strong> {carData.year}</span>
                </div>
                <button className = {styles.buyNow}>Buy Now</button>
            </div>
        </div>
    )
}

export default Car