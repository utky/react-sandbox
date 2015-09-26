import _ from 'underscore';

export default class Lens {

  constructor(s_a, s_b_t) {
    this.s_a = s_a;
    this.s_b_t = s_b_t;
  }

  get(s) {
    return this.s_a(s);
  }

  $(s) {
    return this.get(s);
  }

  set(s, b) {
    return this.s_b_t(s, b);
  }

  compose(lns) {
    let f = (s, b) => {
      lns.s_b_t(s, b);
    };
    
    return new Lens(_.compose(self.s_a, lns.s_a), );
  }

}

export function lens(name, ...parameters) {
  if (parameters 
      && parameters.length > 0 
      && !parameters[0] instanceof Lens) {
  }

  let newLens = function(s, b) {

    this.__name = name;

    if (typeof b !== 'undefined') {
      s[name] = b;
    }
    else {
      return function(_b) {
        s[name] = _b;
      };
    }

    this.$ = function(data) {
      return data[name];
    };
  };

  parameters.map((child) => newLens[child.__name] = child);
}

// test


describe('lens', function() {
  it('', function() {
    let data = {
      uno: {
        dos: {
          tres: '4'
        }
      }
    };

    let l = lens('uno', 
              lens('dos',
                [lens('tres'),
                lens('funf')]));

    expect(l.uno.dos.tres.$(data)).toBe('4');
    
    expect(l.uno.dos.tres.$(l.uno.dos.tres(data, '3'))).toBe('3');


  });
});
