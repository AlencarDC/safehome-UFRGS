import Foo from './foo';

describe('bar', () => {
    it('sync function returns true', () => {
        const result = Foo.bar();
        expect(result).toBe(true);
    });

    it('async function returns true', async () => {
        const result = await Foo.barAsync();
        expect(result).toBe(true);
    });
});