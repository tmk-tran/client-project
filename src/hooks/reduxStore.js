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

export const oFundraisers = () => {
  return useSelector((store) => store.orgFundraisers);
};

export const User = () => {
  return useSelector((store) => store.user);
};
