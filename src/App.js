// App.js
import React from 'react';
import Form from './components/Form';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from './reducer/reducer';

function App() {
  // Create the Redux store with the root reducer
  const store = createStore(userReducer);

  return (
    <div>
      <Provider store={store}>
        <Form />
      </Provider>
    </div>
  );
}

export default App;
