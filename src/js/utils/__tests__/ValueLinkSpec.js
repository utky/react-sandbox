import Immutable from 'immutable';
import shallowEqual from 'react-pure-render/shallowEqual';
import { createLink, sequence } from '../ValueLink';

describe('Link', () => {
  
  const v = 1;
  const f = (v) => v + 1;
  const g = (v) => v * 10;
  const l = createLink(v, f);

  it('provide interface and do not modify its structure.', () => {
    
    expect(l.onChange({ target: { value: l.value } })).toBe(f(v));

  });

  const a = (x) => x;
  const b = (y) => y;
  it('destinct funciton instance by shalow equal', () => {
    expect(shallowEqual(a, b)).toBe(false);
  });
  it('indentify funciton instance by shalow equal', () => {
    expect(shallowEqual(a, a)).toBe(true);
  });
  it('doesnt check structual equality', () => {
    const e = (x) => x;
    const left = Immutable.fromJS({ a: 1, b: { c: 2, d: 3 }, e: e });
    const right = Immutable.fromJS({ a: 1, b: { c: 2, d: 3 }, e: e });
    // const left = { a: 1, b: 6 };
    // const right = { a: 1, b: 6 };
    expect(Immutable.is(left, right)).toBe(true);
    // expect(shallowEqual(left, right)).toBe(true);
  });
});

describe('form schema', () => {
  const e = (x) => x;
  let x = Immutable.Map({ a: 1, b: Immutable.Map({ c: 2, d: 3 }), e: e });
  let y = Immutable.Map({ a: 1, b: Immutable.Map({ c: 2, d: 3 }), e: e });
  it('can be built with object', () => {
    expect(Immutable.is(x, y)).toBe(true);
  });
});
