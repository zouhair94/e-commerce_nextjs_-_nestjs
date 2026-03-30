import { Grid } from "@mui/material";
import { getProducts } from "./actions/product";
import Product from "./product";

export default async function Products() {
    const response = await getProducts();
    const products: { id?: string; name?: string; description?: string; price?: number; }[] = response.error ? [] : response.data || [];
    const validProducts = products.filter((product): product is { id: string; name: string; description: string; price: number; } =>
        Boolean(product.id && product.name && product.description && product.price !== undefined)
    );
    return (
        <>
            <Grid container spacing={2}>
                {validProducts.map((product) => (
                    <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}