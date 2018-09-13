import { AbstractControl } from '@angular/forms';

export class ValidationService {

    static emailValidator(control: AbstractControl) {
        // RFC 2822 compliant regex
        // tslint:disable-next-line
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control: AbstractControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // (?!.*\s)          - Spaces are not allowed
        // tslint:disable-next-line
        if (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
}