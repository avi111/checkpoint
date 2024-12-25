import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {texts} from "../strings.ts";
import {Link, useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{
            mb: 1
        }}>
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1, cursor: "pointer"}} onClick={
                    () => navigate('/')
                }>
                    {texts.STAR_WARS_EXPLORER}
                </Typography>
                <Box mr="auto">
                    <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                        <Button color="inherit">{texts.HOME}</Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    )
}