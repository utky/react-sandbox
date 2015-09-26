
export default class ValueHolder {

  constructor(initialValue) {
    this.value = initialValue;
  }

  listen(v) {
    return this.requestChange(v);
  }

  requestChange(v) {
    this.value = v;
  }
}

export function hold(initialValue) {
  return new ValueHolder(initialValue);
}

