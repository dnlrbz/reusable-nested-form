import {FormControl} from "@angular/forms";

export interface AddressForm {
  city: FormControl<string | null>;
  street: FormControl<string | null>;
  house: FormControl<number | null>;
}
