import { ShoppingBag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { toggleCart } from '../store/slices/cartSlice';
import { Button } from './ui/button';

const Header = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold gradient-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              eFood
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Restaurantes
            </a>
          </nav>

          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(toggleCart())}
            className="relative"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="ml-2 hidden sm:inline">Carrinho</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;