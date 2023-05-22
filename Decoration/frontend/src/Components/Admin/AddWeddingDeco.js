import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2'
import jsPDF from 'jspdf';import { Link } from 'react-router-dom';
;

function AddWeddingDeco() {


    const [code, setCode] = useState("")
    const [store, setStore] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [email, setEmail] = useState("");
    const [descrip, setDescrip] = useState("");
    const [category, setCategory] = useState("");
    const [imageSelected, setimageSelected] = useState("");
    const [submit, setSubmit] = useState(true);
    const [editBtn, setEditBtn] = useState(true)
    const [decorate, setDecorate] = useState([]);
    const [appoiment, setAppoiment] = useState([]);
    const [disableBtn, setDisabletn] = useState(false)

    function print() {
        let x = 100
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8);
        doc.text(20, 20, "Report")
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 60, ' Appointment Report ')
        for (let i = 0; i < appoiment.length; i++) {
            doc.text(25, x, 'Item Code :' + " " + appoiment[i].code + " " + " " + " " + " " + " Type/Selection : " + appoiment[i].category + " / " + appoiment[i].selection + " " + " " + " " + " " + " Name : " + appoiment[i].name + " " + " " + " " + " " + " Date : " + appoiment[i].date)
            x = x + 20
        }
        doc.save('Report.pdf')

    }

    const getAppoiments = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/decoAppoiment/alldecoAppoiment/");
            setAppoiment(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        valid()
        editValid()
        getDecorate()
        getAppoiments()
    }, [code, store, address, phoneNo, email, descrip, imageSelected])


    const valid = () => {
        if ((code !== "") && (address !== "") && (phoneNo !== "") && (email !== "") && (imageSelected !== "") && (descrip !== "") && (store !== "") && (category !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    const editValid = () => {
        if ((code !== "") && (address !== "") && (phoneNo !== "") && (email !== "") && (descrip !== "") && (store !== "") && (imageSelected !== "")) {
            setEditBtn(false)
        } else {
            setEditBtn(true)
        }
    }

    function remove(code) {
        axios.delete("http://localhost:5000" + "/decorate/deletedecorate/" + code).then(() => {
            window.location.href = "/AddWeddingDeco";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Product Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }


    const getDecorate = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/decorate/alldecorate/");
            setDecorate(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");

        const responses = await axios.post(
            "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
            formData
        );
        const picture = imageSelected.name;
        const decorate = { code, store, address, phoneNo, email, descrip, picture, category };
        try {
            const response = await axios.post("http://localhost:5000" + "/decorate/adddecorate", decorate);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Decorate Added",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/AddWeddingDeco";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Decorate Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/AddWeddingDeco";
        }
    };

    const preedit = (code, store, address, phoneNo, email, descrip, category) => {

        setCode(code)
        setStore(store)
        setAddress(address)
        setPhoneNo(phoneNo)
        setEmail(email)
        setDescrip(descrip)
        setCategory(category)
        setDisabletn(true)
    }

    const edit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");

        const responses = await axios.post(
            "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
            formData
        );
        const picture = imageSelected.name;
        const decorate = { code, store, address, phoneNo, email, descrip, picture, category };
        try {
            const response = await axios.put("http://localhost:5000" + "/decorate/updatedecorate", decorate);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Decorate Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/AddWeddingDeco";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Decorate Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/AddWeddingDeco";
        }
    };

    const handleChangeC = (event) => {
        if (event.target.id === "stores") {
            setStore(event.target.value);
        } else if (event.target.id === "types") {
            setCategory(event.target.value);
        }


    };

    return (
        <div class="dashboard-main-wrapper" >

            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-bolt"></i>{" "}Wedding Decoration Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                                {disableBtn ? (
                                    <h3 style={{ marginTop: '40px' }}>Edit Decorations</h3>
                                ) : (
                                    <h3 style={{ marginTop: '40px' }}>Add Decorations</h3>
                                )}
                                <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                    <form onSubmit={handleSubmit}>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" label="Decoration ID" placeholder='ID' variant="outlined" style={{ width: "800px" }} value={code} onChange={(e) => {
                                                    setCode(e.target.value);
                                                }} disabled={disableBtn} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">

                                            <div className="col">
                                                <p style={{ paddingLeft: "350px" }}> Select Store : </p>
                                            </div>
                                            <div className="col">
                                                <div style={{ paddingRight: "380px", }}>
                                                    <select id="stores" value={store} onChange={handleChangeC} style={{ backgroundColor: "#343a40", color: "#fff", width: "200px", height: "40px" }}>
                                                        <option value=""> Stores</option>
                                                        <option value="Store 1">Store 1</option>
                                                        <option value="Store 2">Store 2</option>
                                                        <option value="Store 3">Store 3</option>
                                                        <option value="Store 4">Store 4</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">

                                            <div className="col">
                                                <p style={{ paddingLeft: "350px" }}> Select Type : </p>
                                            </div>
                                            <div className="col">
                                                <div style={{ paddingRight: "380px", }}>
                                                    <select id="types" value={category} onChange={handleChangeC} style={{ backgroundColor: "#343a40", color: "#fff", width: "200px", height: "40px" }} disabled={disableBtn}>
                                                        <option value="">Type</option>
                                                        <option value="Poruwa">Poruwa</option>
                                                        <option value="Flowers">Flowers</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" pattern="[A-Za-z0-9\s\-\.,]+" label="Address" placeholder='201D/Colombo' variant="outlined" style={{ width: "800px" }} value={address} onChange={(e) => {
                                                    setAddress(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="numericInput"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" label="Phone Number" placeholder='011-055-0664' variant="outlined" type='phonenumber' style={{ width: "800px" }} value={phoneNo} inputProps={{ maxLength: 10 }} onChange={(e) => {
                                                    setPhoneNo(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" id="outlined-basic" label="Email" type="email" placeholder='abc@gmail.com' variant="outlined" style={{ width: "800px" }} value={email} onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }} required />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <label style={{ paddingRight: "700px" }}>Description</label>
                                                <p></p>
                                                <textarea className="form-control" id="outlined-basic" label="Description" placeholder='*****' variant="outlined" style={{ width: "800px" }} value={descrip} onChange={(e) => {
                                                    setDescrip(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className='col'>
                                                <input type="file" onChange={(e) => {
                                                    setimageSelected(e.target.files[0]);
                                                }} class="form-control" id="customFile" style={{ width: "800px" }} />
                                            </div>
                                        </div>

                                        {disableBtn ? (
                                            <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px" }} onClick={edit} disabled={editBtn}>Edit</button>
                                        ) : (
                                            <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px" }} disabled={submit}>Save</button>
                                        )}
                                        

                                    </form>
                                    <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px", margin: "0 auto", backgroundColor: "lightgray" }}>
  <Link to={"/DecorationList"}>List</Link>
</button>
                                </div>
                            </div>
                        </center >
                        <br />
                        <br />
                        <center>
                            <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "95%" }}>
                                <div class="row row-cols-1 row-cols-md-3 g-4">
                                    {decorate.map((decorate, key) => (
                                        <div class="col">
                                            <div class="card h-100">
                                                <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + decorate.picture} class="card-img-top"
                                                />
                                                <div class="card-body">
                                                    <h5 class="card-title"> {decorate.store}</h5>
                                                    <h6 class="card-title"> {decorate.code}</h6>
                                                    <h6 class="card-title"> {decorate.category}</h6>
                                                    <h6 class="card-title"> {decorate.descrip}</h6>
                                                    <p class="card-text">
                                                        Address : {decorate.address}
                                                    </p>
                                                    <p class="card-text">
                                                        Contact No : {decorate.phoneNo}
                                                    </p>
                                                    <p class="card-text">
                                                        Email :{decorate.email}
                                                    </p>
                                                    <div className='row'>

                                                        <div className='col'>
                                                            <button type="submit" class="btn btn-dark" onClick={() => preedit(decorate.code, decorate.store, decorate.address, decorate.phoneNo, decorate.email, decorate.descrip, decorate.category)}>Edit</button>
                                                        </div>
                                                        <div className='col'>
                                                            <button type="button" class="btn btn-danger" onClick={() => remove(decorate.code)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div >
                        </center>
                    </div>
                    <center>
                        <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "95%" }}>
                            <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u> Appointment List</u></h4>
                            <div style={{ paddingLeft: "1050px", paddingBottom: "5px" }}>
                                <button type="submit" className="btn btn-success btn-block" style={{ width: "200px" }}
                                    onClick={print} >Appointment Report</button>
                            </div>
                            <br />
                            <table class="table">
                                <thead class="table-dark">
                                    <tr>
                                        <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>Item Code</h6></th>
                                        <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Store Name</h6></th>
                                        <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Type</h6></th>
                                        <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Selection</h6></th>
                                        <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Name</h6></th>
                                        <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Contact No</h6></th>
                                        <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Date</h6></th>
                                        <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Message</h6></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appoiment.map((appoiment, key) => (
                                        <tr className="bg-light">
                                            <td style={{ fontSize: '17px' }}>{appoiment.code}</td>
                                            <td style={{ fontSize: '17px' }}>{appoiment.store}</td>
                                            <td style={{ fontSize: '17px' }}>{appoiment.category}</td>
                                            <td style={{ fontSize: '17px' }}>{appoiment.selection}</td>
                                            <td style={{ fontSize: '17px' }}>{appoiment.name}</td>
                                            <td style={{ fontSize: '17px' }}>{appoiment.phoneNo}</td>
                                            <td style={{ fontSize: '17px' }}>{appoiment.date}</td>
                                            <td style={{ fontSize: '17px' }}>{appoiment.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div >
                    </center>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    )
};

export default AddWeddingDeco
