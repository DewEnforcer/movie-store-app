import React, {useEffect, useState } from 'react';
import Table from './common/table';
import customerService from "../services/customerService";

const Customers = () => {
    const columns = [
        {path: "name", label: "Name"},
        {path: "isGold", label: "Has gold"},
        {path: "phone", label: "Phone number"}
    ]

    const [customers, setCustomers] = useState([]);

    const getCustomers = async () => {
        const {data, status} = await customerService.getCustomers(); 
        if (status !== 200) return;

        setCustomers(data);
    }

    useEffect(() =>{
        getCustomers();
    }, [])

    return (
        <div className="customer_table_box">
            <h2>Customers</h2>
            <Table linkPath="customers" columns={columns} items={customers}/>
        </div>
    )
}
export default Customers;