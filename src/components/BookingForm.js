import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Alert } from "antd";
import logooo from '../logooo.png';
import moment from 'moment';


export const BookingForm = () => {

    const api = axios.create({
        baseURL: 'http://localhost:3002/greeter/'
    })
    const [districts, setDistricts] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districtSubcounty, setDistrictSubcounty] = useState([]);
    const [formSubmit, setFormSubmit] = useState(false);

    const fetchDistricts = async () => {
        const [{ data: { organisationUnits } }, { data: { options: subCounties } }] = await Promise.all([api.get('districts'), api.get('options', { params: { optionSet: 'd16Weazyit6' } })]);
        setDistrictSubcounty(subCounties)
        setDistricts(organisationUnits);
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
        Za0xkyQDpxA: "",
        M3trOwAtMqR: "",
        sB1IHYu2xQT: "",
        pCnbIVhxv4j: "",
        Ewi7FUfcHAD: "",
        LY2bDXpNvS7: "",
        ZHF7EsKgiaM: "",
        VmftwW8JH3g: "",
        CFbojfdkIIj: "",
        NI0QRzJvQ0k: "",
        ud4YNaOH3Dw: "",
        SSGgoQ6SnCx: "",
        s2Fmb8zgEem: "",
        YvnFn4IjKzx: "",
        FZzQbW8AWVd: "",
        ciCR6BBvIT4: "",
        zyhxsh0kFx5: "",
        dob: moment(),
        dueDate: moment(),
        orgUnit: ""
    });

    const changeData = (key, value) => {
        const changedData = { ...data, [key]: value }
        setData(changedData, key, value)
    }

    const changeDistrict = async (e) => {
        setSelectedDistrict(e.target.value)
    }


    useEffect(() => {
        fetchDistricts();
    }, [])



    useEffect(() => {
        fetchDistrictFacilities();
    }, [selectedDistrict])

    async function submit(e) {
        e.preventDefault();
        setFormSubmit(true);
        const { orgUnit, dueDate, dob, ...others } = data;

        const attributes = Object.entries(others).filter(([k, v]) => !!v).map(([attribute, value]) => {
            return { attribute, value }
        });

        const payload = {
            orgUnit,
            trackedEntityType: "MCPQUTHX1Ze",
            dob: dob.format("YYYY-MM-DD"),
            enrollments: [
                {
                    program: "yDuAzyqYABS",
                    enrollmentDate: "2018-12-02",
                    incidentDate: "2018-12-02",
                    orgUnit,
                    events: [
                        {
                            program: "yDuAzyqYABS",
                            orgUnit,
                            dueDate: dueDate.format("YYYY-MM-DD"),
                            status: "SCHEDULE",
                            programStage: "a1jCssI2LkW",
                        }
                    ]
                },
            ],
            attributes
        };
        // console.log(JSON.stringify(payload));
        const response = await api.post('insert', payload)
        console.log(response)
    }

    return (
        <div >
            <div className="bg-blue-600 w-full"> 
                <h1 className="text-3xl py-4 flex font-bold justify-center text-white uppercase">MINISTRY OF HEALTH UGANDA</h1>
            </div>
            <div className="px-32 my-8 justify-center">
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
                                    onChange={(e) => changeData("pCnbIVhxv4j", e.target.value)} id="clientcategory" value={data.pCnbIVhxv4j}
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="">--Select Client Category --</option>
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
                                    onChange={(e) => changeData("ud4YNaOH3Dw", e.target.value)} id="alternativeidtype" value={data.ud4YNaOH3Dw}
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="">--Select Alternative ID Type--</option>
                                    <option>Employee ID</option>
                                    <option>Passport</option>
                                    <option>Voters Card</option>
                                    <option>Foreign National ID</option>
                                    <option>Driving License ID</option>
                                    <option>Other ID</option>
                                    <option>Refugee ID</option>
                                    <option>Guarantor NIN</option>

                                </select>

                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Alternative ID Number
                            </label>
                            <input
                                onChange={(e) => changeData("YvnFn4IjKzx", e.target.value)} id="alternativeidnumber" value={data.YvnFn4IjKzx}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Enter Your Alternative ID Number" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                NIN (For Ugandans)
                            </label>
                            <input
                                onChange={(e) => changeData("Ewi7FUfcHAD", e.target.value)} id="nin" value={data.Ewi7FUfcHAD}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nin" type="text" placeholder="Enter Your NIN" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Sex <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    onChange={(e) => changeData("FZzQbW8AWVd", e.target.value)} id="sex" value={data.FZzQbW8AWVd}
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="sex">
                                    <option value="none">--Choose Sex--</option>
                                    <option>MALE</option>
                                    <option>FEMALE</option>

                                </select>

                                {formSubmit && (!data.FZzQbW8AWVd || data.FZzQbW8AWVd === "") ? (
                                    <Alert message="Please choose a sex" type="error" />   
                                ) : (
                                    ""
                                )}

                            </div>
                        </div>
                    </div>

                    <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">General Information</h1>

                    <div className="flex flex-wrap -mx-3 mb-2 ">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Client Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                onChange={(e) => changeData("sB1IHYu2xQT", e.target.value)} id="clientname" value={data.sB1IHYu2xQT}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="First Name" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Occupation <span className="text-red-500">*</span>
                            </label>
                            <input
                                onChange={(e) => changeData("LY2bDXpNvS7", e.target.value)} id="occupation" value={data.LY2bDXpNvS7}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Priority Group <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    onChange={(e) => changeData("CFbojfdkIIj", e.target.value)} id="prioritygroup" value={data.CFbojfdkIIj}
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="">--Select Priority Group--</option>
                                    <option>Teachers</option>
                                    <option>Prison officers</option>
                                    <option>Military</option>
                                    <option>Police</option>
                                    <option>People with commobidites</option>
                                    <option>Elderly ({'>='}50Yrs)</option>
                                    <option>Prisoners</option>
                                    <option>Health workers</option>
                                    <option>Other</option>

                                </select>

                            </div>
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <DatePicker onChange={(date) => changeData('dob', date)} value={data.dob}/>

                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Age <span className="text-red-500">*</span>
                            </label>
                            <input
                                onChange={(e) => changeData("s2Fmb8zgEem", e.target.value)} id="sex" value={data.s2Fmb8zgEem}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                onChange={(e) => changeData("ciCR6BBvIT4", e.target.value)} id="phonenumber" value={data.ciCR6BBvIT4}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2 ">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Alternative Number
                            </label>
                            <input
                                onChange={(e) => changeData("SSGgoQ6SnCx", e.target.value)} id="alternativenumber" value={data.SSGgoQ6SnCx}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Alternative Number" />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Relationship with Alternative Number
                            </label>
                            <input
                                onChange={(e) => changeData("Sqq2zIYWBOK")} id="relationshipwithalterntivenumber" value={data.Sqq2zIYWBOK}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Relationship with alternative number" />
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
                                <select value={data.Za0xkyQDpxA} onChange={(e) => changeData('Za0xkyQDpxA', e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="">--Select District/Subcounty--</option>
                                    {districtSubcounty.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
                                </select>

                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Parish
                            </label>
                            <input
                                onChange={(e) => changeData("M3trOwAtMqR", e.target.value)} id="parish" value={data.M3trOwAtMqR}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Parish" />
                        </div>
                        <div className="w-full md:w-1/4 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Village
                            </label>
                            <input
                                onChange={(e) => changeData("zyhxsh0kFx5", e.target.value)} id="village" value={data.zyhxsh0kFx5}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Village" />
                        </div>
                        <div className="w-full md:w-1/4 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Place of Work <span className="text-red-500">*</span>
                            </label>
                            <input
                                onChange={(e) => changeData("ZHF7EsKgiaM", e.target.value)} id="placeofwork" value={data.ZHF7EsKgiaM}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Place of Work" />
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
                                    <option value="">--Select District--</option>
                                    {districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>

                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Vaccination Site <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select value={data.orgUnit} onChange={(e) => changeData('orgUnit', e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="">--Select Facility--</option>
                                    {facilities.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <label className="w-full block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Preffered Date of Vaccination <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <DatePicker onChange={(date) => changeData('dueDate', date)} value={data.dueDate}/>
                            </div>
                            </div>
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
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                            SUBMIT
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            CANCEL
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
