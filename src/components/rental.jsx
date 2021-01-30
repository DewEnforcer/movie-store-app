import React, { useEffect, useState } from 'react';
import Table from "./common/table";
import rentalService from "../services/rentalService";

const Rental = () => {
    const columns = [
        {label: "Movie", path: "movie.title"},
        {label: "Customer", path: "customer.name"},
        {label: "Started on", path: "dateOut"},
        {label: "Fee", path: "rentalFee"},
    ]

    const [rentals, setRentals] = useState([]);

    const getRentals = async () => {
        const {data, status} = await rentalService.getRentals(); 
        if (status !== 200) return;

        setRentals(data);
    }

    useEffect(() =>{
        getRentals();
    }, [])

    return (
        <div className="rental_table_box">
            <h2>Rentals</h2>
            <Table linkPath="rentals" columns={columns} items={rentals}/>
        </div>  
    )
}
 
export default Rental;