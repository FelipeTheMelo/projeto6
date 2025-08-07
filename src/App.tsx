import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './store'

import Header from './components/Header'
import Cart from './components/Cart'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Componente de Toasts */}
        <Sonner />

        <BrowserRouter>
          <Header />
          <Cart />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
)

export default App