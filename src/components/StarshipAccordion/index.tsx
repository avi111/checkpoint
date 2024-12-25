import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useQuery } from "react-query";
import { Starship } from "../../types"; // Starship type definition
import { useAPI } from "../../hooks/useApi";
import {texts} from "../../strings.ts";
import {getErrorMessage} from "../../utils.ts";

interface Props {
    starshipUrl: string;
}

// Strings constant
const strings = {
    errorFetchingStarship: texts.ERROR_FETCHING_STARSHIP,
    labels: {
        name: texts.STARSHIP_NAME,
        model: texts.STARSHIP_MODEL,
        manufacturer: texts.STARSHIP_MANUFACTURER,
        cost: texts.STARSHIP_COST,
        length: texts.STARSHIP_LENGTH,
        maxSpeed: texts.STARSHIP_MAX_SPEED,
        crew: texts.STARSHIP_CREW,
        passengers: texts.STARSHIP_PASSENGERS,
        cargoCapacity: texts.STARSHIP_CARGO_CAPACITY,
        consumables: texts.STARSHIP_CONSUMABLES,
        hyperdriveRating: texts.STARSHIP_HYPERDRIVE_RATING,
        starshipClass: texts.STARSHIP_CLASS,
    },
};

export const StarshipAccordion: React.FC<Props> = ({ starshipUrl }) => {
    const { getStarship } = useAPI();

    // React Query for fetching starship data
    const { data: starship, isLoading, error } = useQuery<Starship, Error>(
        ["starship", starshipUrl],
        () => getStarship(starshipUrl)
    );

    if (isLoading) {
        return <CircularProgress size={20} />;
    }

    if (error) {
        return (
            <Accordion>
                <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                    <Typography color="error">{getErrorMessage("starship")}</Typography>
                </AccordionSummary>
            </Accordion>
        );
    }

    if (!starship) {
        return null;
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                <Typography>{starship.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>{strings.labels.name}</TableCell>
                                <TableCell>{starship.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.model}</TableCell>
                                <TableCell>{starship.model}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.manufacturer}</TableCell>
                                <TableCell>{starship.manufacturer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.cost}</TableCell>
                                <TableCell>{starship.cost_in_credits}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.length}</TableCell>
                                <TableCell>{starship.length}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.maxSpeed}</TableCell>
                                <TableCell>{starship.max_atmosphering_speed}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.crew}</TableCell>
                                <TableCell>{starship.crew}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.passengers}</TableCell>
                                <TableCell>{starship.passengers}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.cargoCapacity}</TableCell>
                                <TableCell>{starship.cargo_capacity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.consumables}</TableCell>
                                <TableCell>{starship.consumables}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.hyperdriveRating}</TableCell>
                                <TableCell>{starship.hyperdrive_rating}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.starshipClass}</TableCell>
                                <TableCell>{starship.starship_class}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};