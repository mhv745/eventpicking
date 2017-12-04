import { UserRoles } from '../interfaces/user-roles';

/**
 * Application User
 */
export class User {
  /**
   * uid
   */
  uid: string;
  /**
   * email
   */
  email: string;
  /**
   * avatar url
   */
  photoURL?: string;

  /**
   * display name
   */
  photographerUrl?: string;

  /**
   * user roles
   */
  roles: UserRoles;

  events: string[];

  salutation: string;

  name: string;
  lastname: string;

  street: string;
  city: string;
  zip: string;
  phone: string;

  /**
   * @param  {any} authData firebase user
   */
  constructor(authData: any) {
    this.email = authData.email;
    this.events = authData.events;
    this.photographerUrl = authData.photographerUrl;
    this.photoURL = authData.photoURL;
    this.roles = { user: true, admin: false, photographer: false };
    this.uid = authData.uid;
    this.salutation = authData.salutation;
    this.name = authData.name;
    this.lastname = authData.lastname;
    this.phone = authData.phone;
    this.street = authData.street;
    this.city = authData.city;
    this.zip = authData.zip;
  }
}
