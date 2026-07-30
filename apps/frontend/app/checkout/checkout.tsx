"use client";
import { Button } from "@mui/material";
import checkout from "./actions/checkout";
import getStripe from "./stripe";

export default function Checkout({ productId }: { productId: string }) {
    const handleCheckout = async () => {
        try {
            const session = await checkout(productId);

            // Backend returns session object containing url
            if (session?.data?.url) {
                window.location.href = session.data.url;
            } else if (session?.data.url) {
                window.location.href = session.data.url;
            }
        } catch (error) {
            console.error("Checkout error:", error);
        }
    }
    return (<Button variant="contained" color="primary" onClick={handleCheckout}>
        Buy Now
    </Button>);
}