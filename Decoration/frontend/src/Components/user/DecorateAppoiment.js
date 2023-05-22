import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';
import jsPDF from 'jspdf';import { Link } from 'react-router-dom';


function DecorateAppoiment() {

    var Appointment = reactLocalStorage.getObject('Decoration');
    const [code, setCode] = useState(Appointment[0])
    const [store, setStore] = useState(Appointment[1])
    const [category, setCategory] = useState(Appointment[2]);
    const [phoneNo, setPhoneNo] = useState("")
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [selection, setSelection] = useState("");
    const [submit, setSubmit] = useState(true);



    useEffect(() => {
        valid()
    }, [phoneNo, name, date, message, selection])


    const valid = () => {
        if ((phoneNo !== "") && (name !== "") && (message !== "") && (date !== "") && (selection !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Appoiment = { code, store, phoneNo, name, date, message, category, selection };
        try {
            const response = await axios.post("http://localhost:5000" + "/decoAppoiment/adddecoAppoiment", Appoiment);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Appoiment Added",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/DecorationList";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Appoiment Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/DecorationList";
        }
    };

    const handleChangeC = (event) => {
        setSelection(event.target.value)
    };

    return (
        <div class="dashboard-main-wrapper" >

            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>


                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>



                                <h3 style={{ marginTop: '40px', fontWeight: "bold" }}>Appoiment</h3>

                                <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                    <form onSubmit={handleSubmit}>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" label="Code" placeholder='' variant="outlined" style={{ width: "800px" }} value={code} />
                                            </div>
                                        </div>

                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" label="Store" placeholder='' variant="outlined" style={{ width: "800px" }} value={store} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" label="Type" placeholder='' variant="outlined" style={{ width: "800px" }} value={category} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" label="Name" type="text" placeholder='' variant="outlined" style={{ width: "800px" }} value={name} onChange={(e) => {
                                                    setName(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            {category === "Poruwa" ? (
                                                <div class="row mb-4">
                                                    <div className="col">
                                                        <p style={{ paddingLeft: "350px" }}> Select Color : </p>
                                                    </div>
                                                    <div className="col">
                                                        <div style={{ paddingRight: "380px", }}>
                                                            <select id="types" value={selection} onChange={handleChangeC} style={{ backgroundColor: "#343a40", color: "#fff", width: "200px", height: "40px" }}>
                                                                <option value=""> Select</option>
                                                                <option value="White">White</option>
                                                                <option value="Gold" style={{ color: "gold" }}>Gold</option>
                                                                <option value="Silver" style={{ color: "silver" }}>Silver</option>
                                                                <option value="Brown" style={{ color: "brown" }}>Brown</option>
                                                                <option value="Blue" style={{ color: "blue" }}>Blue</option>
                                                                <option value="Gray" style={{ color: "gray" }}>Gray</option>
                                                                <option value="Pink" style={{ color: "pink" }}>Pink</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div class="row mb-4">
                                                    <div className="col">
                                                        <p style={{ paddingLeft: "300px" }}> Select Flower Type : </p>
                                                    </div>
                                                    <div className="col">
                                                        <div style={{ paddingRight: "380px", }}>
                                                            <select id="types" value={selection} onChange={handleChangeC} style={{ backgroundColor: "#343a40", color: "#fff", width: "200px", height: "40px" }} >
                                                                <option value="">Select</option>
                                                                <option value="Muscari">Muscari</option>
                                                                <option value="Water Lily">Water Lily</option>
                                                                <option value="Anthurium">Anthurium</option>
                                                                <option value="Rose">Rose</option>
                                                                <option value="Dahlia">Dahlia</option>
                                                                <option value="Liac">Liac</option>
                                                                <option value="Tulip">Tulip</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" label="Phone Number" placeholder='011-055-0664' variant="outlined" type='phonenumber' style={{ width: "800px" }} value={phoneNo} inputProps={{ min: 0 }} onChange={(e) => {
                                                    setPhoneNo(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" label="" type="date" placeholder='' variant="outlined" style={{ width: "800px" }} value={date} onChange={(e) => {
                                                    setDate(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <label style={{ paddingRight: "700px" }}>Message</label>
                                                <p></p>
                                                <textarea className="form-control" id="outlined-basic" label="Description" placeholder='*****' variant="outlined" style={{ width: "800px" }} value={message} onChange={(e) => {
                                                    setMessage(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <div style={{ paddingLeft: "590px" }}>
                                            <button type="submit" class="btn btn-primary btn-block mb-5" style={{ width: "220px" }} disabled={submit}>Submit Appoiment</button>
                                        </div>
                                    </form>
                                    <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px", margin: "0 auto", backgroundColor: "lightgray" }}>
  <Link to={"/AddWeddingDeco"}>New Deco</Link></button>
                                </div>
                            </div>
                        </center >
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DecorateAppoiment
