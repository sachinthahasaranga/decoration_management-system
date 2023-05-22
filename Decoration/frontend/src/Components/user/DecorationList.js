import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';




function DecorationList() {

    const [decorate, setDecorate] = useState([]);



    function book(code, store, category) {
        reactLocalStorage.setObject("Decoration", [code, store, category]);
        window.location.href = "/DecorateAppoiment";
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

    useEffect(() => {
        getDecorate()
    }, [])


    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>

            </div>
            {/* <Navbar /> */}
            <div className='bg-image' >
                <div className='mask' style={{ backgroundColor: '#292929' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                    <h3 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><>Decoration List </></h3>
                    <br />
                    <hr />
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {decorate.map((decorate, key) => (
                            <div className="col">
                                <div className="card" style={{ width: "250px" }}>
                                    <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + decorate.picture} className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title"> {decorate.category}</h5>
                                        <h5 className="card-title"> Store Name : {decorate.store}</h5>
                                        <h6 className="card-text" style={{ fontWeight: "bold" }}>
                                            Address : {decorate.address}
                                        </h6>
                                        <h6 className="card-text" style={{ fontWeight: "bold" }}>
                                            Phone No :{decorate.phoneNo}
                                        </h6>
                                        <h6 className="card-text" style={{ fontWeight: "bold" }}>
                                            Email : {decorate.email}
                                        </h6>
                                        <p className="card-text">
                                            {decorate.descrip}
                                        </p>

                                        <div className='row'>
                                            <div className='col' style={{ paddingTop: "10px" }}>
                                                <button type="button" className="btn btn-dark btn-block "
                                                    style={{ backgroundColor: '#0066ff' }} onClick={() => book(decorate.code, decorate.store, decorate.category)}>Select</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </center >
            {/* <Footer /> */}
        </div >
    )
};

export default DecorationList
