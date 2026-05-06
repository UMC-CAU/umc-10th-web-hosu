import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { WelcomeData } from './components/userDataDisplay';

const queryClient = new QueryClient();

export default function App() {
  return(
    <QueryClientProvider client={queryClient} >
      <WelcomeData />
    </QueryClientProvider>
  );
} 