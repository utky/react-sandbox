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
