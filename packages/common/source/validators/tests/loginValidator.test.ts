import loginValidator from '@customValidators/loginValidator';

describe('loginValidators', (): void => {
  const validValidationTargets = [
    {
      email: 'validTest@test.test',
      password: 'validPassword',
    },
    {
      email: 'testTest@test.test',
      password: 'pass1012asd1212',
    },
  ];
  const invalidValidationTargets = [
    {
      email: 'validTest@test',
      password: 'validPassword',
      username: 'testUser',
    },
    {
      email: 'testTest.test',
      password: '1234',
      username: 'UserName',
    },
  ];
  it.each(validValidationTargets)(
    'validate should resolve successfully',
    async target => {
      await expect(
        loginValidator.validate(target, { abortEarly: false }),
      ).resolves.toStrictEqual({
        email: target.email,
        password: target.password,
      });
    },
  );
  it.each(invalidValidationTargets)('validate should reject', async target => {
    await expect(
      loginValidator.validate(target, { abortEarly: false }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
