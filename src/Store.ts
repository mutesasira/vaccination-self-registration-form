import { createDomain } from "effector";
import moment from "moment";

const domain = createDomain();

export const changeForm = domain.createEvent<{ [key: string]: any }>();
export const changeData = domain.createEvent<{ key: string, value: any }>();
// const changeData = (key: string, value: any) => {
//     const changedData = { ...data, [key]: value };
//     setData(changedData);
//   }
export const $store = domain.createStore<{ [key: string]: any }>({
  Za0xkyQDpxA: "",
  M3trOwAtMqR: "",
  sB1IHYu2xQT: "",
  pCnbIVhxv4j: "National",
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
  Bkgeb98v5Ea: "", //self Registered (DE)
  dob: moment(),
  dueDate: moment(),
  orgUnit: "",
}).on(changeForm, (_, form) => form)
  .on(changeData, (state, { key, value }) => {
    return { ...state, [key]: value }
  });
