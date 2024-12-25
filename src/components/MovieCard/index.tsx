import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Typography,} from '@mui/material';
import {Film} from "../../types.ts";
import {CharacterAccordion} from '../CharacterAccordion';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {texts} from "../../strings.ts";
import {VehicleAccordion} from "../VehicleAccordion";
import {StarshipAccordion} from "../StarshipAccordion";
import {SpeciesAccordion} from "../SpeciesAccordion";

interface Props {
    film: Film;
}

export const MovieCard: React.FC<Props> = ({ film }) => {
    const { title, release_date, opening_crawl, director, producer, characters, vehicles, species, starships } = film;
    const subheader = `${texts.RELEASE_DATE_PREFIX}${new Date(release_date).toLocaleDateString()}`;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader title={title} subheader={subheader} />
            <CardContent>
                <Typography variant="body2" paragraph>
                    {opening_crawl}
                </Typography>
                <Typography color="textSecondary">
                    {texts.DIRECTOR_LABEL} {director}
                </Typography>
                <Typography color="textSecondary" paragraph>
                    {texts.PRODUCER_LABEL} {producer}
                </Typography>

                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                        <Typography>{texts.CHARACTERS_ACCORDION_TITLE}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {characters.map((characterUrl) => (
                            <CharacterAccordion key={characterUrl} characterUrl={characterUrl} />
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                        <Typography>Vehicles</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {vehicles.map((vehicleUrl) => (
                            <VehicleAccordion key={vehicleUrl} vehicleUrl={vehicleUrl} />
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                        <Typography>Species</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {species.map((speciesUrl) => (
                            <SpeciesAccordion key={speciesUrl} speciesUrl={speciesUrl} />
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                        <Typography>Starships</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {starships.map((starshipUrl) => (
                            <StarshipAccordion key={starshipUrl} starshipUrl={starshipUrl} />
                        ))}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
};