import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { fetchRestaurants } from '../store/slices/restaurantsSlice';
import RestaurantCard from '../components/RestaurantCard';
import { Skeleton } from '../components/ui/skeleton';

const Home = () => {
    const { items: restaurants, loading, error } = useAppSelector((state) => state.restaurants);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (restaurants.length === 0) {
            dispatch(fetchRestaurants());
        }
    }, [dispatch, restaurants.length]);

    const handleRestaurantClick = (restaurantId: number) => {
        navigate(`/restaurant/${restaurantId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-20">
                {/* Hero Section Skeleton */}
                <section className="gradient-hero py-16 text-center">
                    <div className="container">
                        <Skeleton className="h-12 w-96 mx-auto mb-4 bg-white/20" />
                        <Skeleton className="h-6 w-[600px] mx-auto bg-white/20" />
                    </div>
                </section>

                {/* Restaurants Grid Skeleton */}
                <section className="py-12">
                    <div className="container">
                        <Skeleton className="h-8 w-48 mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="space-y-4">
                                    <Skeleton className="h-48 w-full" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Erro ao carregar restaurantes</h2>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchRestaurants())}
                        className="btn-primary"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    const featuredRestaurants = restaurants.filter(r => r.destacado);
    const otherRestaurants = restaurants.filter(r => !r.destacado);

    return (
        <div className="min-h-screen bg-background pt-16">
            {/* Hero Section */}
            <section className="gradient-hero py-16 text-center text-white">
                <div className="container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
                        Viva experiências gastronômicas no conforto da sua casa
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-shadow">
                        Descubra os melhores restaurantes da sua cidade e peça sua comida favorita
                    </p>
                </div>
            </section>

            {/* Featured Restaurants */}
            {featuredRestaurants.length > 0 && (
                <section className="py-12 bg-muted/30">
                    <div className="container">
                        <h2 className="text-3xl font-bold mb-8">Restaurantes em Destaque</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredRestaurants.map((restaurant) => (
                                <RestaurantCard
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                    onClick={() => handleRestaurantClick(restaurant.id)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Restaurants */}
            <section className="py-12">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8">
                        {featuredRestaurants.length > 0 ? 'Todos os Restaurantes' : 'Restaurantes'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                                onClick={() => handleRestaurantClick(restaurant.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;