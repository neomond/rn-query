import {QueryClient, QueryClientProvider} from 'react-query';
import {AppWithQuery} from './src/AppWithQuery';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppWithQuery />
  </QueryClientProvider>
);

export default App;
