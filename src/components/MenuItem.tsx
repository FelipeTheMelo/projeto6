import { useState } from 'react';
import { MenuItem as MenuItemType, CartItem } from '../types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useAppDispatch } from '../hooks/redux';
import { addItem } from '../store/slices/cartSlice';
import { useToast } from '../hooks/use-toast';

interface MenuItemProps {
    item: MenuItemType;
    restaurantId: number;
    restaurantName: string;
}

const MenuItem = ({ item, restaurantId, restaurantName }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            ...item,
            quantity: 1,
            restaurantId,
            restaurantName,
        };

        dispatch(addItem(cartItem));
        setIsOpen(false);

        toast({
            title: "Item adicionado!",
            description: `${item.nome} foi adicionado ao carrinho.`,
            duration: 2000,
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Card className="card-restaurant cursor-pointer group">
                    <div className="relative">
                        <img
                            src={item.foto}
                            alt={item.nome}
                            className="w-full h-48 object-cover"
                        />
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {item.nome}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {item.descricao}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                                {formatPrice(item.preco)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {item.porcao}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">{item.nome}</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img
                            src={item.foto}
                            alt={item.nome}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    <div className="space-y-4">
                        <p className="text-muted-foreground">{item.descricao}</p>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Preço:</span>
                                <span className="text-lg font-bold text-primary">
                                    {formatPrice(item.preco)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Porção:</span>
                                <span>{item.porcao}</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleAddToCart}
                            className="w-full btn-primary"
                        >
                            Adicionar ao carrinho - {formatPrice(item.preco)}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MenuItem;