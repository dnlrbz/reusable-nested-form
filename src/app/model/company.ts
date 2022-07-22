import {Address} from "./address";

export interface Company {
  companyAddress: Address;
  customerAddresses: Address[];
}
