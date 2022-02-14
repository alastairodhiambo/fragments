/**
 * Tests for src/model/data/memory/index.js
 */

const {
  writeFragment,
  readFragment,
  writeFragmentData,
  readFragmentData,
} = require('../src/model/data/memory/index');

describe('Memory Tests', () => {
  describe('writeFragment', () => {
    test('successful writeFragment', async () => {
      const fragment = {
        ownerId: '1234',
        id: 'id',
        created: new Date(),
      };

      await writeFragment(fragment);

      const data = await readFragment(fragment.ownerId, fragment.id);

      expect(data.created).toEqual(fragment.created);
    });
  });

  describe('writeFragment', () => {
    test('successful readFragment', async () => {
      const fragment = {
        ownerId: '1000',
        id: 'id',
        created: new Date(),
      };
      await writeFragment(fragment);

      const data = await readFragment(fragment.ownerId, fragment.id);

      expect(data.created).toEqual(fragment.created);
    });
  });

  describe('writeFragmentData', () => {
    test('successful writeFragmentData', async () => {
      const fragment = {
        ownerId: '4321',
        id: 'id',
        created: new Date(),
      };

      const value = 'testing writing';

      await writeFragmentData(fragment.ownerId, fragment.id, value);

      const data = await readFragmentData(fragment.ownerId, fragment.id);

      expect(data).toEqual(value);
    });
  });

  describe('readFragmentData', () => {
    test('successful readFragmentData', async () => {
      const fragment = {
        ownerId: '1234',
        id: 'id',
        created: new Date(),
      };

      const value = 'testing reading';

      await writeFragmentData(fragment.ownerId, fragment.id, value);

      const data = await readFragmentData(fragment.ownerId, fragment.id);

      expect(data).toEqual(value);
    });
  });
});
