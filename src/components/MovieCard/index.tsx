import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Typography,} from '@mui/material';
import {Film} from "../../types.ts";
import {CharacterAccordion} from '../CharacterAccordion';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {texts} from "../../strings.ts";

interface Props {
    film: Film;
}

export const MovieCard: React.FC<Props> = ({ film }) => {
    const { title, release_date, opening_crawl, director, producer, characters } = film;
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
            </CardContent>
        </Card>
    );
};