import { Alert, DatePicker } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useStore } from "effector-react";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { $store, changeData } from "../Store";
import Select from 'react-select'

export const Home = () => {
  const store = useStore($store)
  const history = useHistory();
  const api = axios.create({
    baseURL: "https://services.dhis2.hispuganda.org/",
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
      api.get('dhis2', { params: { url: 'organisationUnits.json', level: '3', paging: false, fields: 'id,name' } }),
      api.get("dhis2", { params: { url: `optionSets/d16Weazyit6.json`, paging: false, fields: 'options[name,code]' } })
    ]);
    setDistrictSubcounty(subCounties);
    setDistricts(organisationUnits);
  };

  const fetchDistrictFacilities = async () => {
    if (selectedDistrict) {
      const { data: { organisationUnits } } = await api.get("dhis2", {
        params: { url: `organisationUnits/${selectedDistrict}`, includeDescendants: true, paging: false, fields: 'id,name,level' },
      });
      setFacilities(organisationUnits.filter((ou: any) => ou.level === 5));
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
    // const facility: any = facilities.find((f: any) => f.id === orgUnit);
    // changeData(
    //   { key: 'orgUnitName', value: facility?.name }
    // )

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

    //data is false if NIN exists


    if (/^C[M|F][0-9]{5}[A-Z0-9]{7}$/.test(store.Ewi7FUfcHAD)) {
      const { data: { trackedEntityInstances } } = await api.get("dhis2", {
        params: { url: 'trackedEntityInstances', program: 'yDuAzyqYABS', ouMode: 'ALL', filter: `Ewi7FUfcHAD:eq:${store.Ewi7FUfcHAD}` },
      }
      )
      if (trackedEntityInstances.length === 0) {
        await api.post("dhis2", payload, { params: { url: 'trackedEntityInstances' } });
        history.push('/pdf')
        alert('Your have been successfully registered')
      } else {
        alert('Record with entered NIN has already been registered')
      }
    } else {
      alert('please enter a different NIN Number or Check the Length of the NIN')
    }

  }

  return (
    <div>
      {/* <div className="text-xl py-2 flex jusify-center font-bold pl-2 text-gray-900 uppercase mt-8">
        <h1>Welcome to the Uganda National COVID-19 self registration service</h1>
        <p></p>
      </div> */}
      <div className="px-32  my-2 text-xl ">
        <form onSubmit={(e) => submit(e)} >
          <h1 className="text-sm py-1 w-full flex border-solid bg-gray-100 font-bold text-gray-500 uppercase mt-8">
            Identification
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full text-lg">
              <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2">
                Client Category <span className="text-red-500 font-xl">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={(e) => changeData({ key: "pCnbIVhxv4j", value: e.target.value })}
                  id="clientcategory"
                  value={store.pCnbIVhxv4j}
                  className="block appearance-none w-full  border border-gray-200 text-gray-500 text-xs py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">--Select Client Category --</option>
                  <option>National</option>
                  <option>Refugee</option>
                  <option>Foreigner</option>
                </select>
              </div>
            </div>

            {store.pCnbIVhxv4j !== 'National' && <>
              <div className="w-full ">
                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                  Alternative ID Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => changeData({ key: "ud4YNaOH3Dw", value: e.target.value })}
                    id="alternativeidtype"
                    value={store.ud4YNaOH3Dw}
                    required
                    className="block appearance-none w-full  border border-gray-200 text-gray-700 text-xs py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

              <div className="w-full ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Alternative ID Number <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => changeData({ key: "YvnFn4IjKzx", value: e.target.value })}
                  id="alternativeidnumber"
                  value={store.YvnFn4IjKzx}
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Enter Your Alternative ID Number"
                  required
                />
              </div>
            </>}
          </div>


          <div className="grid grid-cols-3 gap-4 my-2">
            {store.pCnbIVhxv4j === 'National' && <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                NIN (For Ugandans) <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "Ewi7FUfcHAD", value: e.target.value })}
                id="nin"
                value={store.Ewi7FUfcHAD}
                className="appearance-none block w-full text-gray-700  border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Enter Your NIN (14 Characters)"
                required />
              {formSubmit && !store.Ewi7FUfcHAD ? (
                <Alert
                  message="eg. 256772090806"
                  type="error"
                />
              ) : (
                ""
              )}
            </div>}


            <div className="w-full ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Sex <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={(e) => changeData({ key: "FZzQbW8AWVd", value: e.target.value })}
                  id="sex"
                  value={store.FZzQbW8AWVd}
                  className="block appearance-none w-full border border-gray-200 text-gray-700 text-xs py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

          <h1 className="text-sm py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-4 my-2">
            General Information
          </h1>

          <div className=" ">
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2">
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "sB1IHYu2xQT", value: e.target.value })}
                id="clientname"
                value={store.sB1IHYu2xQT}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 my-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="First Name"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Occupation <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "LY2bDXpNvS7", value: e.target.value })}
                id="occupation"
                value={store.LY2bDXpNvS7}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
                required
              /></div>
            <div className="mb-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">
                Priority Group <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={(e) => changeData({ key: "CFbojfdkIIj", value: e.target.value })}
                  id="prioritygroup"
                  value={store.CFbojfdkIIj}
                  className="block appearance-none w-full my-2 border border-gray-200 text-gray-700 text-xs py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  required
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
            <div className="w-full ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "ciCR6BBvIT4", value: e.target.value })}
                id="phonenumber"
                value={store.ciCR6BBvIT4}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="e.g 256700505050"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="w-full ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  onChange={(date) => {
                    changeData({ key: "dob", value: date })
                    changeData({ key: "s2Fmb8zgEem", value: moment().diff(date, "years") })

                  }}
                  value={store.dob}
                  disabledDate={(date: moment.Moment) => moment().diff(date, "years") <= 18}
                  defaultPickerValue={moment().subtract(18, "years")}
                />
              </div>
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                disabled
                onChange={(e) => changeData({ key: "s2Fmb8zgEem", value: e.target.value })}
                id="sex"
                value={store.s2Fmb8zgEem}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
              />
            </div>


            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Alternative Number
              </label>
              <input
                onChange={(e) => changeData({ key: "SSGgoQ6SnCx", value: e.target.value })}
                id="alternativenumber"
                value={store.SSGgoQ6SnCx}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Alternative Number"
              />
            </div></div>

          <div className="">

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2">
                Relationship with Alternative Number
              </label>
              <input
                onChange={(e) => changeData({ key: "Sqq2zIYWBOK", value: e.target.value })}
                id="relationshipwithalterntivenumber"
                value={store.Sqq2zIYWBOK}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Relationship with alternative number"
              />
            </div>
          </div>

          <h1 className="text-sm py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">
            Location
          </h1>
          <h1 className="text-sm py-2 flex border-solid bg-gray-100 font-bold text-gray-500 mt-4">
            Client's Residence Address
          </h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                District/Subcounty <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Select
                  value={store.Za0xkyQDpxA}
                  onChange={(e) => changeData({ key: "Za0xkyQDpxA", value: e.target.value })}
                  className="block appearance-none w-full border border-gray-200 text-gray-700 text-xs py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">--Select District/Subcounty--</option>
                  {districtSubcounty.map((d: { code: string, name: string }) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Parish
              </label>
              <input
                onChange={(e) => changeData({ key: "M3trOwAtMqR", value: e.target.value })}
                id="parish"
                value={store.M3trOwAtMqR}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Parish"
              />
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Village
              </label>
              <input
                onChange={(e) => changeData({ key: "zyhxsh0kFx5", value: e.target.value })}
                id="village"
                value={store.zyhxsh0kFx5}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Village"
              />
            </div>
            <div className="w-full ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Place of Work <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => changeData({ key: "ZHF7EsKgiaM", value: e.target.value })}
                id="placeofwork"
                value={store.ZHF7EsKgiaM}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded text-xs py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Place of Work"
                required
              />
            </div>
          </div>

          <h1 className="text-sm py-2 border-solid bg-gray-100 font-bold pl-4 text-gray-500 mt-4">
            Preffered Vaccination Site
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={changeDistrict}
                  className="block appearance-none w-full border border-gray-200 text-gray-700 text-xs py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="district"
                  required
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
            <div className="w-full ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Vaccination Site <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={store.orgUnit}
                  onChange={(e) => changeData({ key: "orgUnit", value: e.target.value })}
                  required
                  className="block appearance-none w-full border border-gray-200 text-gray-700 text-xs py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="">
              <label className="w-full block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Preffered Date of Vaccination{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="">
                <DatePicker
                  onChange={(date) => changeData({ key: "dueDate", value: date })}
                  value={store.dueDate}
                  disabledDate={(date: moment.Moment) => date.isBefore(moment())}
                />
              </div>
            </div>
          </div>

          <h1 className="text-sm py-2 flex border-solid bg-gray-100 font-bold pl-2 text-gray-500 uppercase mt-8">
            Disclaimer
          </h1>
          <div className="w-full my-2 ">
            <div >
              <label className=" block text-gray-500 font-bold">
                <input className="mr-2 leading-tight" type="checkbox" required />
                <span className="text-sm">
                  <span className="text-red-500">*</span>Agree to Terms and
                  Conditions?
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between pb-8">
          <button onClick={() => { history.push('/') }}
              className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-2 text-sm rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              HOME
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 text-sm rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white text-sm  font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
