import { validateEmail , calculatePasswordEntropy } from './index';

it("Should properly valiate email" , () => {
  expect(validateEmail("jacob..alford@me.com")).toEqual(false);
  expect(validateEmail("jacob@alford@me.com")).toEqual(false);
  expect(validateEmail("jac<ob.alford@me.com")).toEqual(false);
  expect(validateEmail("jacob.alford@me.c")).toEqual(false);
  expect(validateEmail(".alford@me.com")).toEqual(false);
  expect(validateEmail("j.alfor.@me.com")).toEqual(false);
  expect(validateEmail("@me.com")).toEqual(false);
  expect(validateEmail("jacob.alford@me.com")).toEqual(true);
});
