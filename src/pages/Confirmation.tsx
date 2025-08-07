import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { orderId, orderData, totalAmount } = location.state || {};

    useEffect(() => {
        if (!orderId) {
            navigate('/');
        }
    }, [orderId, navigate]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    if (!orderId) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container max-w-2xl">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-success" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Pedido Confirmado!</h1>
                    <p className="text-muted-foreground">
                        Seu pedido foi processado com sucesso
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Detalhes do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Order ID */}
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Número do Pedido</p>
                            <p className="text-lg font-mono font-bold">{orderId}</p>
                        </div>

                        <Separator />

                        {/* Delivery Information */}
                        <div>
                            <h3 className="font-semibold mb-2">Dados de Entrega</h3>
                            <div className="space-y-1 text-sm">
                                <p><strong>Destinatário:</strong> {orderData.delivery.receiver}</p>
                                <p><strong>Endereço:</strong> {orderData.delivery.address.description}</p>
                                <p><strong>Número:</strong> {orderData.delivery.address.number}</p>
                                {orderData.delivery.address.complement && (
                                    <p><strong>Complemento:</strong> {orderData.delivery.address.complement}</p>
                                )}
                                <p><strong>Cidade:</strong> {orderData.delivery.address.city}</p>
                                <p><strong>CEP:</strong> {orderData.delivery.address.zipCode}</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Payment Information */}
                        <div>
                            <h3 className="font-semibold mb-2">Forma de Pagamento</h3>
                            <div className="space-y-1 text-sm">
                                <p><strong>Cartão:</strong> **** **** **** {orderData.payment.card.number.slice(-4)}</p>
                                <p><strong>Titular:</strong> {orderData.payment.card.name}</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Order Summary */}
                        <div>
                            <h3 className="font-semibold mb-2">Resumo do Pedido</h3>
                            <div className="text-lg font-bold text-primary">
                                Total: {formatPrice(totalAmount)}
                            </div>
                        </div>

                        <Separator />

                        {/* Status */}
                        <div className="text-center">
                            <div className="bg-success/10 text-success p-4 rounded-lg">
                                <p className="font-medium">Status: Pedido Confirmado</p>
                                <p className="text-sm mt-1">
                                    Você receberá atualizações sobre o status do seu pedido em breve.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => navigate('/')}
                                className="w-full btn-primary"
                            >
                                Fazer Novo Pedido
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => window.print()}
                                className="w-full"
                            >
                                Imprimir Comprovante
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Confirmation;