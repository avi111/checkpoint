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
import {Character} from "../../types";
import {useAPI} from "../../hooks/useApi";
import {texts} from "../../strings.ts";
import {getErrorMessage} from "../../utils.ts";

interface Props {
    characterUrl: string;
}

// Strings constant
const strings = {
    errorFetchingCharacter: texts.ERROR_FETCHING_CHARACTER,
    labels: {
        height: texts.HEIGHT,
        mass: texts.MASS,
        hairColor: texts.HAIR_COLOR,
        skinColor: texts.SKIN_COLOR,
        eyeColor: texts.EYE_COLOR,
        birthYear: texts.BIRTH_YEAR,
    },
};

export const CharacterAccordion: React.FC<Props> = ({ characterUrl }) => {
    const { getCharacter } = useAPI();

    // React Query for fetching character data
    const { data: character, isLoading, error } = useQuery<Character, Error>(
        ["character", characterUrl],
        () => getCharacter(characterUrl)
    );

    if (isLoading) {
        return <CircularProgress size={20} />;
    }

    if (error) {
        return (
            <Accordion>
                <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                    <Typography color="error">{getErrorMessage("character")}</Typography>
                </AccordionSummary>
            </Accordion>
        );
    }

    if (!character) {
        return null;
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                <Typography>{character.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>{strings.labels.height}</TableCell>
                                <TableCell>{character.height}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.mass}</TableCell>
                                <TableCell>{character.mass}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.hairColor}</TableCell>
                                <TableCell>{character.hair_color}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.skinColor}</TableCell>
                                <TableCell>{character.skin_color}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.eyeColor}</TableCell>
                                <TableCell>{character.eye_color}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.birthYear}</TableCell>
                                <TableCell>{character.birth_year}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};