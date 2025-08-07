import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { closeCart, removeItem, updateQuantity } from '../store/slices/cartSlice';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Separator } from './ui/separator';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { items, isOpen, totalAmount } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const handleUpdateQuantity = (id: number, newQuantity: number) => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeItem(id));
    };

    const handleCheckout = () => {
        dispatch(closeCart());
        navigate('/checkout');
    };

    return (
        <Sheet open={isOpen} onOpenChange={() => dispatch(closeCart())}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                        <span>Carrinho de Compras</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch(closeCart())}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">Seu carrinho está vazio</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Adicione alguns itens deliciosos!
                            </p>
                        </div>
                    ) : (
                        <>
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 bg-card p-4 rounded-lg">
                                    <img
                                        src={item.foto}
                                        alt={item.nome}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm">{item.nome}</h4>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {item.restaurantName}
                                        </p>
                                        <p className="font-bold text-primary">
                                            {formatPrice(item.preco)}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>

                                        <span className="w-8 text-center text-sm font-medium">
                                            {item.quantity}
                                        </span>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>Total:</span>
                                    <span className="text-primary">{formatPrice(totalAmount)}</span>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    className="w-full btn-primary"
                                    disabled={items.length === 0}
                                >
                                    Finalizar Pedido
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;