import { createLink, sequence } from '../ValueLink';

describe('Link', () => {
  
  const v = 1;
  const f = (v) => v + 1;
  const g = (v) => v * 10;
  const l = createLink(v, f);

  it('provide interface and do not modify its structure.', () => {
    
    expect(l.requestChange(l.value)).toBe(f(v));

  });

});

describe('value linker', () => {
  it('', => {
    /**
     * Figure out via type.
     *
     *    data Link a = Link { value: a, onChange: a -> () }
     *    type Selector = String -- 'you.and.me' selectn like syntax
     *    set: a -> Operation a -- and so on e.g. merge, unshift
     *    command: Selector -> Operation a -> Command a
     *    createAction: Command a -> Action a
     *    bind: Action -> State a -> Link a
     *    linkState: State a -> Link a
     *
     *  Given:
     *
     *    State a
     *    Schema a
     *
     */
  });
});
