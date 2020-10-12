import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import 'utils/feedbacks';


/**
 * redux-persist配置
 */
const reduxPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['player'],
};

/**
 * dva配置
 */
export const dva = {
  config: {
    // onAction: createLogger(),
    onError(err) {
      err.preventDefault()
      console.log('XXXXXXXXXX')
      console.error(err)
    },
    onReducer(reducer) {
      return persistReducer(reduxPersistConfig, reducer);
    },
  },
};


// if (process.env.NODE_ENV === 'production') {
//   console = console || {};
//   console.error = () => {};
//   console.debug = () => {};
//   console.info = () => {};
//   console.log = () => {};
// }

// export const dva = {
//   config: {
//     onError(err) {
//       err.preventDefault();
//       console.error(err.message);
//     },
//   },
// };


