import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

export const BookingForm = () => {

    const api = axios.create({
        baseURL: 'http://localhost:3002/greeter/'
    })
    const [districts, setDistricts] = useState([]);
    const [districtSubcounty, setDistrictSubcounty] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDistrictSubcounty, setSelectedDistrictSubcounty] = useState('');


    const fetchdistrictSubcounty = async () => {
        const { data: { optionSets } } = await api.get('districtSubcounty');
        setDistrictSubcounty(optionSets)
    }

    const fetchDistricts = async () => {
        const { data: { organisationUnits } } = await api.get('districts');
        setDistricts(organisationUnits)
    }

    const fetchDistrictFacilities = async () => {
        if (selectedDistrict) {
            const { data } = await api.get('facilities', {
                params: { district: selectedDistrict }
            });
            setFacilities(data)
        }
    }
    const [data, setData] = useState({
        clientcategory: "",
        alternativeidtype: "",
        alternativeidnumber: "",
        nin: "",
        sex: ""
    });
    console.log(data)
    const changeDistrict = async (e) => {
        setSelectedDistrict(e.target.value)
    }
  
    const changeDistrictSubcounty = async (e) => {
        setSelectedDistrictSubcounty(e.target.value)
    }

    useEffect(() => {
        fetchDistricts();
    }, [])

    useEffect(() => {
        fetchdistrictSubcounty();
    }, [])

    useEffect(() => {
        fetchDistrictFacilities();
    }, [selectedDistrict])

    async function submit(e) {
        e.preventDefault();
        // const response = await axios.post(url, {
        //     clientcategory: data.clientcategory,
        //     alternativeidtype: data.alternative,
        //     alternativeidnumber: data.alternativenumber,
        //     nin: data.nin,
        //     sex: data.sex,
        // });

        // console.log(response)
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    return (
        <div className="container  px-32 my-8" >
            <h1 className="text-3xl py-4 flex bg-green-500 font-bold justify-center text-white mt-4 uppercase">Vaccination Self Registration Form</h1>
            <form onSubmit={(e) => submit(e)}
                className="w-full">
                <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">Identification</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Client Category <span className="text-red-500 font-xl">*</span>
                        </label>
                        <div className="relative">
                            <select
                                onChange={(e) => handle(e)} id="clientcategory" value={data.clientcategory}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="client-category">
                                <option>National</option>
                                <option>Refugee</option>
                                <option>Foreigner</option>
                            </select>

                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Alternative ID Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                onChange={(e) => handle(e)} id="alternativeidtype" value={data.alternativeidtype}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="alternative-id-type">
                                <option>Employee ID</option>
                                <option>Passport</option>
                                <option>Voters Card</option>
                                <option>Foreign National ID</option>
                                <option>Driving License ID</option>
                                <option>Other ID</option>
                                <option>Refugee</option>
                                <option>Guarantor NIN</option>

                            </select>

                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Alternative ID NUmber <span className="text-red-500">*</span>
                        </label>
                        <input
                            onChange={(e) => handle(e)} id="alternativeidnumber" value={data.alternativeidnumber}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="alternative-id-number" type="text" placeholder="Alternative ID Number" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            NIN (For Ugandans)
                        </label>
                        <input
                            onChange={(e) => handle(e)} id="nin" value={data.nin}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nin" type="text" placeholder="Enter Your NIN" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Sex <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                onChange={(e) => handle(e)} id="sex" value={data.sex}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="sex">
                                <option>Male</option>
                                <option>female</option>

                            </select>

                        </div>
                    </div>
                </div>

                <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">General Information</h1>

                <div className="flex flex-wrap -mx-3 mb-2 ">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="first-name" type="text" placeholder="First Name" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" type="text" placeholder="Last name" />

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Occupation <span className="text-red-500">*</span>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Priority Group <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="priority-group">
                                <option>Teachers</option>
                                <option>Prison Officers</option>
                                <option>Military</option>
                                <option>Police</option>
                                <option>People with Commobidites</option>
                                <option>Elderly {'>'}= 50year</option>
                                <option>Prisoners</option>
                                <option>Health Workers</option>

                            </select>

                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Other Group
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="other-group" type="text" placeholder="" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <DatePicker
                                dateRender={current => {
                                    const style = {};
                                    if (current.date() === 1) {
                                    }
                                    return (
                                        <div className="ant-picker-cell-inner" style={style}>
                                            {current.date()}
                                        </div>
                                    );
                                }}
                            />

                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Age <span className="text-red-500">*</span>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="age" type="text" placeholder="" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone-number" type="text" placeholder="" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2 ">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Alternative Number
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="alternative-number" type="text" placeholder="Alternative Number" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Relationship with Alternative Number
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="relationship-with-alternative-number" type="text" placeholder="Relationship with alternative number" />
                    </div>
                </div>

                <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">Location</h1>
                <h1 className="text-lg py-2 flex border-solid bg-gray-100 font-bold pl-4 text-gray-500 mt-4">Client's Residence Address</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            District/Subcounty <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select value={SelectedDistrictSubcounty} onChange={changeDistrictSubcounty} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="district-subcounty">
                                {districtSubcounty.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>

                        </div>
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Parish
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="parish" type="text" placeholder="Parish" />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Village
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="village" type="text" placeholder="Village" />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Place of Work <span className="text-red-500">*</span>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="place-of-work" type="text" placeholder="Place of Work" />
                    </div>
                </div>

                <h1 className="text-lg py-2 flex border-solid bg-gray-100 font-bold pl-4 text-gray-500 mt-4">Preffered Vaccination Site</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            District <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select value={selectedDistrict} onChange={changeDistrict} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="district">
                                {districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>

                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Vaccination Site <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="alternative-id-type">
                                {facilities.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Preffered Date of Vaccination <span className="text-red-500">*</span>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="village" type="text" placeholder="Village" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className=" block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">
                                <span className="text-red-500">*</span> Self registered?
                            </span>
                        </label>
                    </div>
                </div>

                <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">Disclaimer</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <label className=" block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">
                                <span className="text-red-500">*</span>Agree to Terms and Conditions?
                            </span>
                        </label>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-8">
                    <button className="bg-green-500 hover:bg-green-700 text-white-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Submit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Cancel
                    </button>

                </div>
                <input type="submit" />
            </form>
        </div>
    )
}
