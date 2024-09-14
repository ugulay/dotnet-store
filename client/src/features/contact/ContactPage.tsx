import { Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";

const ContactPage = () => {

    const { title } = useAppSelector(state => state.counter);

    return (
        <>
            <Typography variant="h2">{title}</Typography>

        </>
    )

}

export default ContactPage;