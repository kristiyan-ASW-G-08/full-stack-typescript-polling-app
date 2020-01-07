import pollValidator from '@customValidators/pollValidator';

describe('pollValidators', (): void => {
  const validValidationTargets = [
    {
      name: 'SomeName',
      description: 'SomeDescription',
      options: ['Option1', 'Option2', 'Option3', 'Option4'],
      endDate: 'Tue Jan 07 2021',
    },
  ];
  const invalidValidationTargets = [
    {
      name: '',
      description: '',
      options: ['Option1'],
      endDate: 'not a date',
    },
  ];
  it.each(validValidationTargets)(
    'validate should resolve successfully',
    async target => {
      await expect(
        pollValidator.validate(target, { abortEarly: false }),
      ).resolves.toStrictEqual({
        email: target.email,
        password: target.password,
      });
    },
  );
  it.each(invalidValidationTargets)('validate should reject', async target => {
    await expect(
      pollValidator.validate(target, { abortEarly: false }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
