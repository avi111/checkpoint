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
import { Vehicle } from "../../types"; // Vehicle type definition
import { useAPI } from "../../hooks/useApi";
import { texts } from "../../strings.ts";

interface Props {
    vehicleUrl: string;
}

// Strings constant
const strings = {
    errorFetchingVehicle: texts.ERROR_FETCHING_VEHICLE,
    labels: {
        name: texts.VEHICLE_NAME,
        model: texts.VEHICLE_MODEL,
        manufacturer: texts.VEHICLE_MANUFACTURER,
        cost: texts.VEHICLE_COST,
        length: texts.VEHICLE_LENGTH,
        maxSpeed: texts.VEHICLE_MAX_SPEED,
        crew: texts.VEHICLE_CREW,
        passengers: texts.VEHICLE_PASSENGERS,
        cargoCapacity: texts.VEHICLE_CARGO_CAPACITY,
        consumables: texts.VEHICLE_CONSUMABLES,
        vehicleClass: texts.VEHICLE_CLASS,
    },
};

export const VehicleAccordion: React.FC<Props> = ({ vehicleUrl }) => {
    const { getVehicle } = useAPI();

    // React Query for fetching vehicle data
    const { data: vehicle, isLoading, error } = useQuery<Vehicle, Error>(
        ["vehicle", vehicleUrl],
        () => getVehicle(vehicleUrl)
    );

    if (isLoading) {
        return <CircularProgress size={20} />;
    }

    if (error) {
        console.error(strings.errorFetchingVehicle, error);
        return (
            <Accordion>
                <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                    <Typography color="error">{strings.errorFetchingVehicle}</Typography>
                </AccordionSummary>
            </Accordion>
        );
    }

    if (!vehicle) {
        return null;
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                <Typography>{vehicle.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>{strings.labels.name}</TableCell>
                                <TableCell>{vehicle.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.model}</TableCell>
                                <TableCell>{vehicle.model}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.manufacturer}</TableCell>
                                <TableCell>{vehicle.manufacturer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.cost}</TableCell>
                                <TableCell>{vehicle.cost_in_credits}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.length}</TableCell>
                                <TableCell>{vehicle.length}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.maxSpeed}</TableCell>
                                <TableCell>{vehicle.max_atmosphering_speed}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.crew}</TableCell>
                                <TableCell>{vehicle.crew}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.passengers}</TableCell>
                                <TableCell>{vehicle.passengers}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.cargoCapacity}</TableCell>
                                <TableCell>{vehicle.cargo_capacity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.consumables}</TableCell>
                                <TableCell>{vehicle.consumables}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{strings.labels.vehicleClass}</TableCell>
                                <TableCell>{vehicle.vehicle_class}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};