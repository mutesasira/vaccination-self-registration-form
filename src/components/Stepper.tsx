import React from 'react'
import { Steps, Button, message } from 'antd';
import {Identification} from './Identification';
import {Home} from './Home';
import {GeneralInformation} from './GeneralInformation';
import {Location} from './Location';
import {VaccinationSite} from './VaccinationSite';
import { Alert, DatePicker } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useStore } from "effector-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { $store, changeData } from "../Store";


const { Step } = Steps;
const steps = [
    {
        title: 'Home',
        content: <Home/>,
      },
    {
      title: 'Identification',
      content: <Identification />,
    },
    {
      title: 'General Information',
      content: <GeneralInformation />
    },
    {
      title: 'Location',
      content: <Location />,
    },
    {
        title: 'Preffered Vaccination Site',
        content: <VaccinationSite />,
      },
  ];

export const Stepper = () => {
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
  // const [nin, setNin] = useState([]);

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
    // changeForm({ ...store, })
    //validate nin

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

    // const ninValidation = async ()=>{
    //   const {data} = await api.get(
    //     "validateNin",{
    //       params: {attribute: "Ewi7FUfcHAD"},
    //     }
    //   )
    //   if (nin === store.Ewi7FUfcHAD){
    //     return alert("NIN  already exists please Use another NIN")
    //   } else {}
      const response = await api.post("insert", payload);
      //console.log(payload);
      console.log(response);
      history.push('/pdf')
 
    
  }

    const [current, setCurrent] = React.useState(0);

    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
    return (
        <>
        <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}
      
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
    )
}
