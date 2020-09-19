/**
 * 全局State状态
 */
export default {
  namespace: 'global',
  
  state: {
    a: 100,
    s: false,
  },

  effects: {
    *yy({ payload }, { put, call, select }) {
      yield call(() => {
        return new Promise((resolve, reject) => {
          setInterval(() => {
            resolve()
          }, 1000);
        })
      })
      const a = yield select((state) => state.global.a) 
      yield put({ type: 'xx', payload: {num: a + 1} })
      yield put({ type: 'updateS', payload: { s: true } });
    }
  },

  reducers: {
    xx(state, { payload }) {
      console.log('xx')
      return {
        ...state,
        a: payload.num
      };
    },

    updateS(state, { payload: { s } }) {
      console.log('MMMMMMMM')
      console.log(s)
      return {
        ...state,
        s: true,
      }
    },
  },
}