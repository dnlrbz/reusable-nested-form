import {FormArray, FormControl} from "@angular/forms";
import {Address} from "./address";

export interface CompanyForm {
  companyAddress: FormControl<Address | null>;
  customerAddresses: FormArray<FormControl<Address | null>>;
}
