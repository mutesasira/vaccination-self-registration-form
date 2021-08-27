import { Alert, DatePicker } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useStore } from "effector-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { $store, changeData } from "../Store";

export const BookingForm = () => {
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
    const { orgUnit, dueDate, dob, ...others } = store;
    const facility: any = facilities.find((f: any) => f.id === orgUnit);
    changeData({ key: 'orgUnitName', value: facility?.name })
    // changeForm({ ...store, })

    // const attributes = Object.entries(others)
    //   .filter(([k, v]) => !!v)
    //   .map(([attribute, value]) => {
    //     return { attribute, value };
    //   });

    // const payload = {
    //   orgUnit,
    //   trackedEntityType: "MCPQUTHX1Ze",
    //   dob: dob.format("YYYY-MM-DD"),
    //   enrollments: [
    //     {
    //       program: "yDuAzyqYABS",
    //       enrollmentDate: "2018-12-02",
    //       incidentDate: "2018-12-02",
    //       orgUnit,
    //       events: [
    //         {
    //           program: "yDuAzyqYABS",
    //           orgUnit,
    //           dueDate: dueDate.format("YYYY-MM-DD"),
    //           status: "SCHEDULE",
    //           programStage: "a1jCssI2LkW",
    //         },
    //       ],
    //     },
    //   ],
    //   attributes,
    // };
    // console.log(JSON.stringify(payload));
    // const response = await api.post("insert", payload);
    // console.log(response);
    history.push('/pdf')
  }

  return (
    <div>
      <div className="px-32 my-8 justify-center">
        <h1 className="text-3xl py-4 flex bg-green-500 font-bold justify-center text-white mt-4 uppercase">
          Vaccination Self Registration Form
        </h1>
        <form onSubmit={(e) => submit(e)} className="w-full">
          <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">
            Identification
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Client Category <span className="text-red-500 font-xl">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={(e) => changeData({ key: "pCnbIVhxv4j", value: e.target.value })}
                  id="clientcategory"
                  value={store.pCnbIVhxv4j}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">--Select Client Category --</option>
                  <option>National</option>
                  <option>Refugee</option>
                  <option>Foreigner</option>
                </select>
              </div>
            </div>
            {store.pCnbIVhxv4j !== 'National' && <>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Alternative ID Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => changeData({ key: "ud4YNaOH3Dw", value: e.target.value })}
                    id="alternativeidtype"
                    value={store.ud4YNaOH3Dw}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Alternative ID Number
                </label>
                <input
                  onChange={(e) => changeData({ key: "YvnFn4IjKzx", value: e.target.value })}
                  id="alternativeidnumber"
                  value={store.YvnFn4IjKzx}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Enter Your Alternative ID Number"
                />
              </div>
            </>}
          </div>


          <div className="flex flex-wrap -mx-3 mb-6">
            {store.pCnbIVhxv4j === 'National' && <div className="w-full md:w-1/3 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                NIN (For Ugandans)
              </label>
              <input
                onChange={(e) => changeData({ key: "Ewi7FUfcHAD", value: e.target.value })}
                id="nin"
                value={store.Ewi7FUfcHAD}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Enter Your NIN"
              />
            </div>}


            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Sex <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={(e) => changeData({ key: "FZzQbW8AWVd", value: e.target.value })}
                  id="sex"
                  value={store.FZzQbW8AWVd}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="none">--Choose Sex--</option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>

                {formSubmit &&
                  (!store.FZzQbW8AWVd || store.FZzQbW8AWVd === "") ? (
                  <Alert message="Please choose a sex" type="error" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">
            General Information
          </h1>

          <div className="flex flex-wrap -mx-3 mb-2 ">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "sB1IHYu2xQT", value: e.target.value })}
                id="clientname"
                value={store.sB1IHYu2xQT}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Occupation <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "LY2bDXpNvS7", value: e.target.value })}
                id="occupation"
                value={store.LY2bDXpNvS7}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Priority Group <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={(e) => changeData({ key: "CFbojfdkIIj", value: e.target.value })}
                  id="prioritygroup"
                  value={store.CFbojfdkIIj}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">--Select Priority Group--</option>
                  <option>Teachers</option>
                  <option>Prison officers</option>
                  <option>Military</option>
                  <option>Police</option>
                  <option>People with commobidites</option>
                  <option>Elderly ({">="}50Yrs)</option>
                  <option>Prisoners</option>
                  <option>Health workers</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  onChange={(date) => changeData({ key: "dob", value: date })}
                  value={store.dob}
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "s2Fmb8zgEem", value: e.target.value })}
                id="sex"
                value={store.s2Fmb8zgEem}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "ciCR6BBvIT4", value: e.target.value })}
                id="phonenumber"
                value={store.ciCR6BBvIT4}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2 ">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Alternative Number
              </label>
              <input
                onChange={(e) => changeData({ key: "SSGgoQ6SnCx", value: e.target.value })}
                id="alternativenumber"
                value={store.SSGgoQ6SnCx}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Alternative Number"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Relationship with Alternative Number
              </label>
              <input
                onChange={(e) => changeData({ key: "Sqq2zIYWBOK", value: e.target.value })}
                id="relationshipwithalterntivenumber"
                value={store.Sqq2zIYWBOK}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Relationship with alternative number"
              />
            </div>
          </div>

          <h1 className="text-xl py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">
            Location
          </h1>
          <h1 className="text-lg py-2 flex border-solid bg-gray-100 font-bold pl-4 text-gray-500 mt-4">
            Client's Residence Address
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                District/Subcounty <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={store.Za0xkyQDpxA}
                  onChange={(e) => changeData({ key: "Za0xkyQDpxA", value: e.target.value })}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">--Select District/Subcounty--</option>
                  {districtSubcounty.map((d: { code: string, name: string }) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Parish
              </label>
              <input
                onChange={(e) => changeData({ key: "M3trOwAtMqR", value: e.target.value })}
                id="parish"
                value={store.M3trOwAtMqR}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Parish"
              />
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Village
              </label>
              <input
                onChange={(e) => changeData({ key: "zyhxsh0kFx5", value: e.target.value })}
                id="village"
                value={store.zyhxsh0kFx5}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Village"
              />
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Place of Work <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "ZHF7EsKgiaM", value: e.target.value })}
                id="placeofwork"
                value={store.ZHF7EsKgiaM}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Place of Work"
              />
            </div>
          </div>

          <h1 className="text-lg py-2 flex border-solid bg-gray-100 font-bold pl-4 text-gray-500 mt-4">
            Preffered Vaccination Site
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={changeDistrict}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="district"
                >
                  <option value="">--Select District--</option>
                  {districts.map((d: { id: string, name: string }) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Vaccination Site <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={store.orgUnit}
                  onChange={(e) => changeData({ key: "orgUnit", value: e.target.value })}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">--Select Facility--</option>
                  {facilities.map((d: { id: string, name: string }) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="w-full block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Preffered Date of Vaccination{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <DatePicker
                    onChange={(date) => changeData({ key: "dueDate", value: date })}
                    value={store.dueDate}
                  />
                </div>
              </div>
            </div>
          </div>

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
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              SUBMIT
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
