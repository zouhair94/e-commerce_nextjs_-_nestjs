import Checkout from "@/app/checkout/checkout";
import { API_URL } from "@/app/common/constants/api";
import { get } from "@/app/common/util/fetch";
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface ProductPageProps {
    params: Promise<{
        productId: string;
    }>;
}
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageExists: boolean
}
export default async function ProductPage({ params }: ProductPageProps) {
    const { productId } = await params;
    let product: Product | null = null;
    try {
        const result = await get(`products/${productId}`);
        if (result.error) {
            console.error(result.error);
        } else {
            product = result.data;
            console.log("Product data:", product);
        }
    } catch (error) {
        console.error(error);
    }

    if (!product) {
        return (
            <Typography variant="h5">
                Product not found
            </Typography>
        );
    }

    return (
        <Grid container marginBottom={"2rem"} rowGap={3}>
            {product?.imageExists && (
                <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                    <Image
                        src={`${API_URL}/images/products/${product.id}.jpg`}
                        width="0"
                        height="0"
                        className="w-full sm:w-3/4 h-auto"
                        sizes="100vw"
                        alt="Picture of the product"
                    />
                </Grid>
            )}
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack gap={3}>
                    <Typography variant="h2">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography variant="h4">${product.price}</Typography>
                    <Checkout productId={product.id} />
                </Stack>
            </Grid>
        </Grid>
    );

}