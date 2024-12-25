import { useState } from "react";
import { Film } from "../../types.ts";
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { MovieCard } from "../MovieCard";
import { texts } from "../../strings.ts";
import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useApi.ts";

export const MovieGrid = () => {
    const [search, setSearch] = useState('');
    const { getFilms } = useAPI();

    // Fetch films using React Query
    const { data, error, isLoading } = useQuery<{ results: Film[] }, Error>(
        ['films', search],
        () => getFilms(search),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
            enabled: search !== '' || search.length === 0,
        }
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                {texts.STAR_WARS_MOVIES_CATALOG}
            </Typography>

            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label="Search movies"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            {error && (
                <Box mb={4}>
                    <Alert severity="error">
                        {texts.ERROR_FETCHING_FILMS}: {error.message || texts.AN_ERROR_OCCURRED_WHILE_FETCHING_FILMS}
                    </Alert>
                </Box>
            )}

            {isLoading ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {data?.results?.map((film: Film) => (
                        <Grid item xs={12} sm={6} md={4} key={film.episode_id}>
                            <MovieCard film={film} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};