import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {CompanyForm} from "./model/company-form";
import {Address} from "./model/address";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  companyForm = new FormGroup<CompanyForm>({
    companyAddress: new FormControl<Address>({} as Address),
    customerAddresses: new FormArray<FormControl<Address | null>>([])
  });

  get customerAddressesFormArray(): FormArray<FormControl<Address | null>> {
    return this.companyForm.controls.customerAddresses as FormArray<FormControl<Address | null>>;
  }

  toggleCustomerAddressState(index: number) {
    const customer = this.customerAddressesFormArray.at(index);
    customer.disabled ? customer.enable() : customer.disable()
  }

  addCustomerAddress() {
    this.customerAddressesFormArray.push(new FormControl<Address>({} as Address));
  }

  removeCustomerAddress(index: number) {
    this.customerAddressesFormArray.removeAt(index);
  }
}
