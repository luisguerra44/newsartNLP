require("regenerator-runtime/runtime");

const newObj = require("../server/index");

it("should not be null or undefined.", () => {
  expect(newObj).toEqual(expect.anything());
});

