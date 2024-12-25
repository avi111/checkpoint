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
import {useQuery} from "react-query";
import {Species} from "../../types"; // Species type definition
import {useAPI} from "../../hooks/useApi";
import {texts} from "../../strings.ts";
import {getErrorMessage} from "../../utils.ts";

interface Props {
    speciesUrl: string;
}

// Strings constant
const strings = {
    errorFetchingSpecies: texts.ERROR_FETCHING_SPECIES,
    labels: {
        name: texts.SPECIES_NAME,
        classification: texts.SPECIES_CLASSIFICATION,
        designation: texts.SPECIES_DESIGNATION,
        averageHeight: texts.SPECIES_AVERAGE_HEIGHT,
        skinColors: texts.SPECIES_SKIN_COLORS,
        hairColors: texts.SPECIES_HAIR_COLORS,
        eyeColors: texts.SPECIES_EYE_COLORS,
        averageLifespan: texts.SPECIES_AVERAGE_LIFESPAN,
        homeworld: texts.SPECIES_HOMEWORLD,
        language: texts.SPECIES_LANGUAGE,
    },
};

export const SpeciesAccordion: React.FC<Props> = ({speciesUrl}) => {
    const {getSpecies} = useAPI();

    // React Query for fetching species data
    const {data: species, isLoading, error} = useQuery<Species, Error>(
        ["species", speciesUrl],
        () => getSpecies(speciesUrl)
    );

    if (isLoading) {
        return <CircularProgress size={20}/>;
    }

    if (error) {
        return (
            <Accordion>
                <AccordionSummary expandIcon={<KeyboardArrowDownIcon/>}>
                    <Typography color="error">{getErrorMessage("species")}</Typography>
                </AccordionSummary>
            </Accordion>
        );
    }

    if (!species) {
        return null;
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon/>}>
                <Typography>{species.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>{strings.labels.name}</TableCell>
                                <TableCell>{species.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.classification}</TableCell>
                                <TableCell>{species.classification}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.designation}</TableCell>
                                <TableCell>{species.designation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.averageHeight}</TableCell>
                                <TableCell>{species.average_height}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.skinColors}</TableCell>
                                <TableCell>{species.skin_colors}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.hairColors}</TableCell>
                                <TableCell>{species.hair_colors}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.eyeColors}</TableCell>
                                <TableCell>{species.eye_colors}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.averageLifespan}</TableCell>
                                <TableCell>{species.average_lifespan}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.homeworld}</TableCell>
                                <TableCell>{species.homeworld}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.language}</TableCell>
                                <TableCell>{species.language}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};