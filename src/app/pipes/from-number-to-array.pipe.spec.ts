import { FromNumberToArrayPipe } from './from-number-to-array.pipe';

describe('FromNumberToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new FromNumberToArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
