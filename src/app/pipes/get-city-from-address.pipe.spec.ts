import { GetCityFromAddressPipe } from './get-city-from-address.pipe';

describe('GetCityFromAddressPipe', () => {
  it('create an instance', () => {
    const pipe = new GetCityFromAddressPipe();
    expect(pipe).toBeTruthy();
  });
});
