import { useSelector } from "react-redux";

export const oDetails = () => {
  return useSelector((store) => store.orgDetails);
};

export const oGroups = () => {
  return useSelector((store) => store.orgGroups);
};

export const oNotes = () => {
  return useSelector((store) => store.orgNotes);
};

// export const mNotes = () => {
//   return useSelector((store) => store.mNotes);
// }

export const oFundraisers = () => {
  return useSelector((store) => store.orgFundraisers);
};

export const User = () => {
  return useSelector((store) => store.user);
};

export const Errors = () => {
  return useSelector((store) => store.errors);
};
