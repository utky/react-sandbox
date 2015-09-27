import { identity, plens, lens, fromObjectProperty, fromObject, propGet, propSet } from '../Lens';

describe('lens category law', () => {

  let f = lens(function(x) { return 1 }, function(s, b) { return 2 });
  let g = lens(function(x) { return 3 }, function(s, b) { return 4 });
  let h = lens(function(x) { return 5 }, function(s, b) { return 6 });
  let dummyS = 'anything';

  it('left identity', () => {

    
    expect(identity.compose(f).get(dummyS)).toBe(f.get(dummyS));

  });

  it('right identity', () => {

    expect(f.compose(identity).get(dummyS)).toBe(f.get(dummyS));

  });

  it('associative', () => {

    expect(f.compose(g).compose(h).get(dummyS))
      .toBe(f.compose(g.compose(h)).get(dummyS));

  });

});

describe('property lens', () => {

  it('satisfies law: 1. set s (get s) == s', () => {

    let s = {
      value: '1'
    };

    let valuel = plens('value');

    expect(valuel.set(s, valuel.get(s)).value).toBe(s.value);

  });

  it('satisfies law: 2. get (set s v) == v', () => {

    let s = {
      value: '1'
    };

    let value = plens('value');

    expect(value.get(value.set(s, 2))).toBe(2);

  });

  it('satisfies law: 3. get (set (set s v1) v2) == v2', () => {

    let s = {
      value: '1'
    };

    let value = plens('value');

    expect(value.get(value.set(value.set(s, 2), 3))).toBe(3);

  });

});

describe('fromObjectProperty', () => {
  it('build lens from object', () => {
    let s = {
      value: 1
    };
    expect(fromObjectProperty(s).value.get(s)).toBe(s.value);
  });

  it('build lens from nested object', () => {
    let s = {
      a: {
        b: {
          value: 1
        }
      }
    };

    expect(fromObjectProperty(s).a.b.value.get(s)).toBe(s.a.b.value);
  });

  it('can access sibling node by lens from nested object', () => {
    let s = {
      a: {
        b: {
          value: 1
        }
      },
      c: {
        d: {
          value: 2
        }
      }
    };

    expect(fromObjectProperty(s).a.b.value.get(s))
      .toBe(fromObjectProperty(s).c.d.value.get(s) - 1);

  });

  it('', () => {
    let state = {
      profile: {
        name: ''
      }
    };

    let lns = fromObjectProperty(state);
    let result = lns.profile.name.set(state, 'new-name');
    expect(result.profile.name).toBe('new-name');
  });

});
