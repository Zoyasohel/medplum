import { matchesRoute, parseLiteralPath, parsePath } from './match';

describe('Match', () => {
  test('Root', () => {
    expect(matchesRoute(parseLiteralPath('/'), parsePath('/'))).toEqual({
      matchedPath: [],
      remainingPath: [],
      params: {},
    });

    expect(matchesRoute(parseLiteralPath('/a'), parsePath('/'))).toEqual(false);
  });

  test('Child', () => {
    expect(matchesRoute(parseLiteralPath('/a'), parsePath('/a'))).toEqual({
      matchedPath: [{ type: 'literal', value: 'a' }],
      remainingPath: [],
      params: {},
    });

    expect(matchesRoute(parseLiteralPath('/'), parsePath('/a'))).toEqual(false);
    expect(matchesRoute(parseLiteralPath('/b'), parsePath('/a'))).toEqual(false);
  });

  test('Path params', () => {
    expect(matchesRoute(parseLiteralPath('/a/123/b'), parsePath('/a/:id/b'))).toEqual({
      matchedPath: [
        { type: 'literal', value: 'a' },
        { type: 'literal', value: '123' },
        { type: 'literal', value: 'b' },
      ],
      remainingPath: [],
      params: { id: '123' },
    });
  });
});
