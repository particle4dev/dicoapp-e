import config from '../../utils/config';

const symbolToName = config.get('symbol.symbolToName');

// eslint-disable-next-line import/prefer-default-export
export function covertSymbolToName(syl) {
  const s = symbolToName[syl];
  if (s) return s;
  return '';
}

export function floor(number, after = 1) {
  // eslint-disable-next-line no-restricted-properties
  const p = Math.pow(10, after);
  return Math.floor(number * p) / p;
}

export const Loops = (() => {
  /**
   * Define class
   *
   * @author      Steve Hoang <particles4dev>
   * @version
   * @since       0.1
   *
   * @param d     delay time
   * @param t     a function to execute
   *
   * */
  // eslint-disable-next-line func-names
  const f = function(d, t) {
    /**
     * Private property
     * */
    const self = this;
    let delay = d === null ? 1000 : d;
    let todo = t;
    let start = 0;
    let end = 2 * delay;
    let run = true;
    /**
     * Public property
     * */
    this.timeoutID = null;
    /**
     * Get current time
     *
     * @return          Number
     * @see             void
     * */
    const getTime = () => new Date().getTime();
    /**
     * Set a timer to delay
     *
     * @param value
     * @return          void
     * @see             void
     * */
    this.setDelay = value => {
      delay = value;
      start = 0;
      end = 2 * delay;
    };
    /**
     * Specify a function to execute when the delay time is done
     *
     * @param func
     * @return          void
     * @see             void
     * */
    this.setTodo = func => {
      todo = func;
    };
    /**
     *
     *
     * @param f
     * @param args
     * @return          void
     * @see             void
     * */
    const remind = async (func, args) => {
      if (run === true) {
        start = getTime();
        await func.apply(func, args);
        const callback = args[args.length - 1];
        if (typeof callback === 'function') callback();
        end = getTime();
        self.setup(...args);
      }
    };
    /**
     *
     *
     * @param callback
     * @return          void
     * @see             void
     * */
    // eslint-disable-next-line func-names
    this.setup = function(...args) {
      if (run === true) {
        const mt = delay - (end - start);
        if (mt > 0) {
          this.timeoutID = window.setTimeout(remind, mt, todo, args);
        } else {
          remind(todo, args);
        }
      }
    };
    /**
     * exits the loop
     *
     * @return          void
     * @see             void
     * */
    // eslint-disable-next-line func-names
    this.cancel = function() {
      if (typeof this.timeoutID === 'number') {
        window.clearTimeout(this.timeoutID);
        delete this.timeoutID;
      }
      run = false;
      console.log('stop loop');
      return this;
    };
    /**
     * Get current state
     *
     * @return          void
     * @see             void
     * */
    this.getState = () => {
      console.log(`Run is ${run}`);
      return run;
    };
  };
  return f;
})();
