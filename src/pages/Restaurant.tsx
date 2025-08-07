import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { useAppSelector } from '../hooks/redux';
import MenuItem from '../components/MenuItem';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const Restaurant = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { items: restaurants } = useAppSelector((state) => state.restaurants);

    const restaurant = restaurants.find(r => r.id === Number(id));

    useEffect(() => {
        if (!restaurant && restaurants.length > 0) {
            navigate('/');
        }
    }, [restaurant, restaurants.length, navigate]);

    if (!restaurant) {
        return (
            <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Restaurante não encontrado</h2>
                    <Button onClick={() => navigate('/')}>Voltar para Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-16">
            {/* Restaurant Header */}
            <div
                className="relative h-64 md:h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${restaurant.capa})` }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative container h-full flex items-center">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate('/')}
                        className="absolute top-4 left-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>

                    <div className="text-white max-w-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-shadow">
                                {restaurant.titulo}
                            </h1>
                            <div className="flex items-center gap-2">
                                {restaurant.destacado && (
                                    <Badge className="bg-secondary text-secondary-foreground">
                                        Destaque
                                    </Badge>
                                )}
                                <Badge variant="outline" className="bg-primary text-primary-foreground border-primary">
                                    {restaurant.tipo}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <Star className="h-5 w-5 fill-accent text-accent" />
                            <span className="font-medium text-lg">{restaurant.avaliacao}</span>
                        </div>

                        <p className="text-lg opacity-90 text-shadow">
                            {restaurant.descricao}
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <section className="py-12">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8">Cardápio</h2>

                    {restaurant.cardapio.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">
                                Este restaurante ainda não tem itens no cardápio.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {restaurant.cardapio.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    item={item}
                                    restaurantId={restaurant.id}
                                    restaurantName={restaurant.titulo}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Restaurant;