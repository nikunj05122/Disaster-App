import { ORGANIZATION } from './../config/constant';
import fire from "./../assets/icons/fire.svg";
import hospital from "./../assets/icons/hospital.svg";
import NDRF from "./../assets/icons/NDRF.svg";
import police from "./../assets/icons/police.svg";

export const locationTypeFilter = (type) => {
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