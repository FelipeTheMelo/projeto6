import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { clearCart } from '../store/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';
import { OrderData } from '../types';

const Checkout = () => {
    const { items, totalAmount } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deliveryData, setDeliveryData] = useState({
        receiver: '',
        address: '',
        city: '',
        zipCode: '',
        number: '',
        complement: '',
    });

    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        cardCode: '',
        expiryMonth: '',
        expiryYear: '',
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            toast({
                title: "Carrinho vazio",
                description: "Adicione itens ao carrinho antes de finalizar o pedido.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData: OrderData = {
                products: items.map(item => ({
                    id: item.id,
                    price: item.preco,
                })),
                delivery: {
                    receiver: deliveryData.receiver,
                    address: {
                        description: deliveryData.address,
                        city: deliveryData.city,
                        zipCode: deliveryData.zipCode,
                        number: Number(deliveryData.number),
                        complement: deliveryData.complement,
                    },
                },
                payment: {
                    card: {
                        name: paymentData.cardName,
                        number: paymentData.cardNumber,
                        code: Number(paymentData.cardCode),
                        expires: {
                            month: Number(paymentData.expiryMonth),
                            year: Number(paymentData.expiryYear),
                        },
                    },
                },
            };

            const response = await fetch('https://ebac-fake-api.vercel.app/api/efood/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Erro ao processar pedido');
            }

            const result = await response.json();

            // Clear cart and navigate to confirmation
            dispatch(clearCart());
            navigate('/confirmation', {
                state: {
                    orderId: result.orderId,
                    orderData,
                    totalAmount
                }
            });

        } catch (error) {
            toast({
                title: "Erro ao processar pedido",
                description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Carrinho vazio</h2>
                    <p className="text-muted-foreground mb-4">
                        Adicione alguns itens ao carrinho antes de finalizar o pedido.
                    </p>
                    <Button onClick={() => navigate('/')}>
                        Voltar aos Restaurantes
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                    <h1 className="text-3xl font-bold">Finalizar Pedido</h1>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Forms */}
                    <div className="space-y-6">
                        {/* Delivery Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Dados de Entrega</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="receiver">Nome do destinatário</Label>
                                    <Input
                                        id="receiver"
                                        value={deliveryData.receiver}
                                        onChange={(e) => setDeliveryData({ ...deliveryData, receiver: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="address">Endereço</Label>
                                    <Input
                                        id="address"
                                        value={deliveryData.address}
                                        onChange={(e) => setDeliveryData({ ...deliveryData, address: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="city">Cidade</Label>
                                        <Input
                                            id="city"
                                            value={deliveryData.city}
                                            onChange={(e) => setDeliveryData({ ...deliveryData, city: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="zipCode">CEP</Label>
                                        <Input
                                            id="zipCode"
                                            value={deliveryData.zipCode}
                                            onChange={(e) => setDeliveryData({ ...deliveryData, zipCode: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="number">Número</Label>
                                        <Input
                                            id="number"
                                            type="number"
                                            value={deliveryData.number}
                                            onChange={(e) => setDeliveryData({ ...deliveryData, number: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="complement">Complemento</Label>
                                        <Input
                                            id="complement"
                                            value={deliveryData.complement}
                                            onChange={(e) => setDeliveryData({ ...deliveryData, complement: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Dados de Pagamento</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="cardName">Nome no cartão</Label>
                                    <Input
                                        id="cardName"
                                        value={paymentData.cardName}
                                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="cardNumber">Número do cartão</Label>
                                    <Input
                                        id="cardNumber"
                                        value={paymentData.cardNumber}
                                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="cardCode">CVV</Label>
                                        <Input
                                            id="cardCode"
                                            value={paymentData.cardCode}
                                            onChange={(e) => setPaymentData({ ...paymentData, cardCode: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="expiryMonth">Mês</Label>
                                        <Input
                                            id="expiryMonth"
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={paymentData.expiryMonth}
                                            onChange={(e) => setPaymentData({ ...paymentData, expiryMonth: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="expiryYear">Ano</Label>
                                        <Input
                                            id="expiryYear"
                                            type="number"
                                            min="2024"
                                            value={paymentData.expiryYear}
                                            onChange={(e) => setPaymentData({ ...paymentData, expiryYear: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Order Summary */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>Resumo do Pedido</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{item.nome}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.quantity}x {formatPrice(item.preco)}
                                            </p>
                                        </div>
                                        <span className="font-medium">
                                            {formatPrice(item.preco * item.quantity)}
                                        </span>
                                    </div>
                                ))}

                                <Separator />

                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-primary">{formatPrice(totalAmount)}</span>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default Checkout;