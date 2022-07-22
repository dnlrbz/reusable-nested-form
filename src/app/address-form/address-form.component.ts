import {Component, forwardRef, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from "@angular/forms";
import {Address} from "../model/address";
import {AddressForm} from "../model/address-form";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    },
  ]
})
export class AddressFormComponent implements ControlValueAccessor, Validator, OnDestroy {
  destroySubject = new Subject<void>();

  addressForm = new FormGroup<AddressForm>({
    city: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    house: new FormControl<number | null>(null, Validators.required),
  });

  registerOnChange(fn: any): void {
    this.addressForm.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.addressForm.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.addressForm.disable() : this.addressForm.enable();
  }

  writeValue(address: Address): void {
    this.addressForm.patchValue(address, { emitEvent: false});
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.addressForm.valid ? null : { address: true };
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

}
