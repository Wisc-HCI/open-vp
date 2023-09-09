import { useParameter, useStoryContext } from './hooks';

describe('addons/hooks', () => {
  beforeEach(() => {
    global.STORYBOOK_HOOKS_CONTEXT = undefined;
  });

  afterEach(() => {
    global.STORYBOOK_HOOKS_CONTEXT = undefined;
  });

  describe('useStoryContext', () => {
    test('should throw', () => {
      expect(() => useStoryContext()).toThrowError(
        'Storybook preview hooks can only be called inside decorators and story functions.'
      );
    });
  });

  describe('useParameter', () => {
    beforeEach(() => {
      global.STORYBOOK_HOOKS_CONTEXT = {
        currentContext: {
          parameters: {
            'undefined key': undefined,
            'null key': null,
            'false key': false,
            'zero key': 0,
            'object key': { defined: true },
          },
        },
      };
    });

    test('undefined key', () => {
      expect(useParameter('undefined key', 'undefined default')).toEqual('undefined default');
    });

    test('null key', () => {
      expect(useParameter('null key', 'null default')).toEqual('null default');
    });

    test('false key', () => {
      expect(useParameter('false key', 'false default')).toEqual(false);
    });

    test('zero key', () => {
      expect(useParameter('zero key', 'zero default')).toEqual(0);
    });

    test('object key', () => {
      expect(useParameter('object key', 'object default')).toMatchObject({ defined: true });
    });
  });
});
