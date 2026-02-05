"use client";

import { Stack, TextField, Button, Link } from '@mui/material';
import NextLink from 'next/link';
import { useActionState } from 'react';
import createUser from './create-user';
import { ValidationErrors } from '@/app/util/errors';

export default function Signup() {
    const [state, formAction] = useActionState(createUser, { error: "" });
    return (
        <form action={formAction} className="w-full max-w-xs">
            <Stack spacing={2}>
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    type="text"
                    helperText={ValidationErrors(state, "name")}
                    error={Boolean(ValidationErrors(state, "name"))}
                />
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    helperText={
                        ValidationErrors(state, "email")
                    }
                    error={Boolean(ValidationErrors(state, "email"))}
                />
                <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    helperText={ValidationErrors(state, "password")}
                    error={Boolean(ValidationErrors(state, "password"))}
                />
                <Button type="submit" variant="contained">
                    Sign-up
                </Button>
                <Link component={NextLink} href="/auth/login" className="self-center">
                    Login
                </Link>
            </Stack>
        </form>
    );
}