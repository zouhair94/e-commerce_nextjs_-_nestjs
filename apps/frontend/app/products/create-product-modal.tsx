"use client";

import { Modal, Box, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { CreateProduct } from "./actions/product";
import { FormResponse } from "../common/interface/form-response.interface";

const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
}

export default function CreateProductModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const [response, setResponse] = useState<FormResponse>();
    return (

        <Modal open={open} onClose={handleClose}>
            <Box sx={styles}>
                <h2 className="mx-auto w-fit mb-2" >Create Product</h2>
                <form className="w-full max-w-xs" action={async (data: FormData) => {
                    const res = await CreateProduct(data);
                    setResponse(res);
                    if (!response?.error) {
                        handleClose();
                    }

                }} method="post">
                    <Stack spacing={2}>
                        <TextField
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Product Name"
                            error={!!response?.error}
                            helperText={response?.error}
                        />
                        <TextField
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            name="description"
                            multiline
                            rows={4}
                            type="text"
                            placeholder="Product Description"
                            error={!!response?.error}
                            helperText={response?.error}
                        />
                        <TextField
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Product Price" error={!!response?.error}
                            helperText={response?.error}
                        />
                        <Button
                            className="bg-blue-500 hover:bg-blue-700 text   white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Create
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>

    );
}