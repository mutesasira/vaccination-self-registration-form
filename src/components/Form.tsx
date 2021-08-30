import React from 'react'
import { Stepper } from './Stepper'
import axios from "axios";
import { useStore } from "effector-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { $store, changeData } from "../Store";
import { Alert, DatePicker } from "antd";

export const Form = () => {
    const store = useStore($store)
    const history = useHistory();
    const api = axios.create({
        baseURL: "http://localhost:3002/greeter/",
    });
    const [districts, setDistricts] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [districtSubcounty, setDistrictSubcounty] = useState([]);
    const [formSubmit, setFormSubmit] = useState(false);

    const fetchDistricts = async () => {
        const [
            {
                data: { organisationUnits },
            },
            {
                data: { options: subCounties },
            },
        ] = await Promise.all([
            api.get("districts"),
            api.get("options", { params: { optionSet: "d16Weazyit6" } }),
        ]);
        setDistrictSubcounty(subCounties);
        setDistricts(organisationUnits);
    };

    const fetchDistrictFacilities = async () => {
        if (selectedDistrict) {
            const { data } = await api.get("facilities", {
                params: { district: selectedDistrict },
            });
            setFacilities(data);
        }
    };

    const changeDistrict = async (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(e.target.value);
    };

    useEffect(() => {
        fetchDistricts();
    }, []);

    useEffect(() => {
        fetchDistrictFacilities();
    }, [selectedDistrict]);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormSubmit(true);
        const { orgUnit, dueDate, clientname, dob, ...others } = store;
        const facility: any = facilities.find((f: any) => f.id === orgUnit);
        changeData(
            { key: 'orgUnitName', value: facility?.name }
        )

        const attributes = Object.entries(others)
            .filter(([k, v]) => !!v)
            .map(([attribute, value]) => {
                return { attribute, value };
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
                            eventDate: dueDate.format("YYYY-MM-DD"),
                            dueDate: dueDate.format("YYYY-MM-DD"),
                            status: "ACTIVE",
                            programStage: "a1jCssI2LkW",
                            dataValues: [{
                                dataElement: "Bkgeb98v5Ea",
                                value: true
                            }
                            ]
                        },
                    ],
                },
            ],
            attributes,
        };
        // console.log(JSON.stringify(payload));

        //data is false if NIN exists
        const { data } = await api.get(
            "validateNin", {
            params: { value: store.Ewi7FUfcHAD },

        }
        )
        if (data) {

            <Alert message="Success" type="success" />
            const response = await api.post("insert", payload);
            //console.log(payload);
            console.log(response);
            //history.push('/pdf')
        } else {
            <Alert message="NIN already Exisits, Please insert a different NIN" type="error" />
        }

    }
    return (
        <div>
            <form onSubmit={(e) => submit(e)} className="w-full">
                <Stepper />
                <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">
                    Disclaimer
                </h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <label className=" block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">
                                <span className="text-red-500">*</span>Agree to Terms and
                                Conditions?
                            </span>
                        </label>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-8">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        CANCEL
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    )
}
