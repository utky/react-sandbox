
/**
 * @param value : any
 * @parma callback : any -> void
 * @return object { value: *, requestChange: function }
 */
function createLink(value, callback) {
  return {
    value: value,
    requestChange: callback
  };
}

/**
 * @param f : any -> void
 * @parma link : object { value: *, requestChange: function }
 * @return object { value: *, requestChange: function }
 */
function sequence(link, ...fs) {
  const g = (v) => {
    link.requestChange(v);
    fs.map((f) => f(v));
  };
  return createLink(link.value, g)
}
