const showMessage = require('../app/index.js');

test('Successful Message', () => {
  expect(showMessage("Success!")).toBe("Message: Success!");
});