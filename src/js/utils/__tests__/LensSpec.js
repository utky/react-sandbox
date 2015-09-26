import { identity, plens, lens } from '../Lens';

describe('lens category law', function() {

  let f = lens(function(x) { return 1 }, function(s, b) { return 2 });
  let g = lens(function(x) { return 3 }, function(s, b) { return 4 });
  let h = lens(function(x) { return 5 }, function(s, b) { return 6 });
  let dummyS = 'anything';

  it('left identity', function() {

    
    expect(identity.compose(f).get(dummyS)).toBe(f.get(dummyS));

  });

  it('right identity', function() {

    expect(f.compose(identity).get(dummyS)).toBe(f.get(dummyS));

  });

  it('associative', function() {

    expect(f.compose(g).compose(h).get(dummyS))
      .toBe(f.compose(g.compose(h)).get(dummyS));

  });

});

describe('property lens', function() {

  it('satisfies law: 1. set s (get s) == s', function() {

    let s = {
      value: '1'
    };

    let value = plens('value');

    expect(value.set(s, value.get(s)).value).toBe(s.value);

  });

  it('satisfies law: 2. get (set s v) == v', function() {

    let s = {
      value: '1'
    };

    let value = plens('value');

    expect(value.get(value.set(s, 2))).toBe(2);

  });

  it('satisfies law: 3. get (set (set s v1) v2) == v2', function() {

    let s = {
      value: '1'
    };

    let value = plens('value');

    expect(value.get(value.set(value.set(s, 2), 3))).toBe(3);

  });

});



