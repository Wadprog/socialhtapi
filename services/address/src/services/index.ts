import state from './state/state.service';
import city from './city/city.service';
import address from './address/address.service';
import addressTypes from './address-types/address-types.service';
import country from './country/country.service';

import { Application } from '../declarations';

export default function (app: Application): void {

  app.configure(state);
  app.configure(city);
  app.configure(address);
  app.configure(addressTypes);
  app.configure(country);
}



