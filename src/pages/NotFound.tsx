import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";

const NotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background pt-16">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
                <p className="text-xl text-muted-foreground mb-6">
                    Oops! Página não encontrada
                </p>
                <p className="text-muted-foreground mb-8">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <Button
                    onClick={() => navigate('/')}
                    className="btn-primary"
                >
                    Voltar ao Início
                </Button>
            </div>
        </div>
    );
};

export default NotFound;