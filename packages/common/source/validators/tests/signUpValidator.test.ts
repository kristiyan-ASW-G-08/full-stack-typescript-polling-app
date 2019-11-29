import signUpValidator from '@customValidators/loginValidator';

describe('loginValidators', (): void => {
  const validValidationTargets = [
    {
      username: 'TestUser',
      email: 'validTest@test.test',
      password: 'validPassword',
      confirmationPassword: 'validPassword',
      location: 'London',
    },
    {
      username: 'SecondUser',
      email: 'testTest@test.test',
      password: 'pass1012asd1212',
      confirmationPassword: 'pass1012asd1212',
      location: 'Sofia',
    },
  ];
  const invalidValidationTargets = [
    {
      email: 'validTest@test',
      password: 'validPassword',
      confirmationPassword: 'pass1012asd1212',
      location: 'Sofia',
      username: 'testUser',
    },
    {
      email: 'testTest.test',
      password: '1234',
      confirmationPassword: 'pass1012asd1212',
      location: 'Sofia',
      username: '',
    },
    {},
    {
      unknown: 'testTest.test',
      password: '1234',
      confirmationPassword: 'pass1012asd1212',
      location: 'Sofia',
      username: '',
    },
  ];
  it.each(validValidationTargets)(
    'validate should resolve successfully',
    async target => {
      await expect(
        signUpValidator.validate(target, { abortEarly: false }),
      ).resolves.toStrictEqual(target);
    },
  );
  it.each(invalidValidationTargets)('validate should reject', async target => {
    await expect(
      signUpValidator.validate(target, { abortEarly: false }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
