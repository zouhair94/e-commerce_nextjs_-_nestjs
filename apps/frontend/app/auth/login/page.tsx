"use client";

import { Stack, TextField, Button, Typography, Link, Box } from '@mui/material';
import NextLink from 'next/link';
import { useActionState } from 'react';
import login from './login';
import { ValidationErrors } from '@/app/common/util/errors';

export default function Login() {
    const [state, formAction] = useActionState(login, { error: "" });
    return (
        <form action={formAction}>
            <Stack
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ width: '100%', maxWidth: 350, mx: 'auto', p: 2 }}
            >
                {/* Header for better UX */}
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    Login
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Enter your credentials to access your account
                </Typography>

                <Stack spacing={2.5} sx={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        placeholder="email@example.com"
                        helperText={ValidationErrors(state, "email")}
                        error={Boolean(ValidationErrors(state, "email"))}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        helperText={ValidationErrors(state, "password")}
                        error={Boolean(ValidationErrors(state, "password"))}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem' }}
                    >
                        Login
                    </Button>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Typography variant="body2">
                            Don&apos;t have an account?{' '}
                            <Link
                                component={NextLink}
                                href="/auth/sign-up"
                                underline="hover"
                                fontWeight="medium"
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </form>
    );
}