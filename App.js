import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import RootNavigator from './src/navigation/index';
import 'react-native-get-random-values'

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  )
}

