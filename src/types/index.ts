export interface Restaurant {
    id: number;
    titulo: string;
    destacado: boolean;
    tipo: string;
    avaliacao: number;
    descricao: string;
    capa: string;
    cardapio: MenuItem[];
}

export interface MenuItem {
    foto: string;
    preco: number;
    id: number;
    nome: string;
    descricao: string;
    porcao: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
    restaurantId: number;
    restaurantName: string;
}

export interface OrderData {
    products: Array<{
        id: number;
        price: number;
    }>;
    delivery: {
        receiver: string;
        address: {
            description: string;
            city: string;
            zipCode: string;
            number: number;
            complement?: string;
        };
    };
    payment: {
        card: {
            name: string;
            number: string;
            code: number;
            expires: {
                month: number;
                year: number;
            };
        };
    };
}

export interface OrderResponse {
    orderId: string;
}