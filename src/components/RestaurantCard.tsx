import { Star } from 'lucide-react';
import { Restaurant } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  return (
    <Card className="card-restaurant cursor-pointer group" onClick={onClick}>
      <div className="relative">
        <img
          src={restaurant.capa}
          alt={restaurant.titulo}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
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

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {restaurant.titulo}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{restaurant.avaliacao}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {restaurant.descricao}
        </p>

        <Button
          className="w-full btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Saiba mais
        </Button>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;