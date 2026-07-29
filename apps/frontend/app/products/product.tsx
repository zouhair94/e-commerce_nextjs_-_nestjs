import { Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { API_URL } from "@/app/common/constants/api";

interface ProductProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        imageExists: boolean;
    };
}

export default function Product({ product }: ProductProps) {
    return (
        <Card className="p-4">
            <Stack gap={3} alignItems="center">
                <Typography variant="h6">{product.name}</Typography>
                {
                    product.imageExists ?? (
                        <Image src={`${API_URL}/images/products/${product.id}.jpg`}
                            width="0"
                            height="0"
                            className="w-full h-auto"
                            sizes="100vw"
                            alt={product.name} />
                    )
                }
                <Typography variant="body1" sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // limit lines instead of chars
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}>{product.description}</Typography>
                <Typography variant="subtitle1">${product.price.toFixed(2)}</Typography>

            </Stack>
        </Card>
    );
}