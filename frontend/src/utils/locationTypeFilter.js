import { ORGANIZATION } from './../config/constant';
import fire from "./../assets/icons/fire.svg";
import hospital from "./../assets/icons/hospital.svg";
import NDRF from "./../assets/icons/NDRF.svg";
import police from "./../assets/icons/police.svg";

const locationTypeFilter = (type) => {
    if (type === ORGANIZATION.FIRE) {
        return fire;
    } else if (type === ORGANIZATION.HOSPITAL) {
        return hospital;
    } else if (type === ORGANIZATION.NDRF) {
        return NDRF;
    } else if (type === ORGANIZATION.POLICE) {
        return police;
    }
}

const locationTypeColorFilter = (type) => {
    if (type === ORGANIZATION.FIRE) {
        return '#ED5338';
    } else if (type === ORGANIZATION.HOSPITAL) {
        return '#3E998F';
    } else if (type === ORGANIZATION.NDRF) {
        return '#563E99';
    } else if (type === ORGANIZATION.POLICE) {
        return '#F6BE00';
    }
}

export { locationTypeFilter, locationTypeColorFilter };