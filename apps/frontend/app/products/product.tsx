import { Card, Typography } from "@mui/material";

interface ProductProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
    };
}

export default function Product({ product }: ProductProps) {
    return (
        <Card className="p-4">
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body1" sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3, // limit lines instead of chars
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}>{product.description}</Typography>
            <Typography variant="subtitle1">${product.price.toFixed(2)}</Typography>
        </Card>
    );
}