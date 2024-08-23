import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";

const BasketPage = () => {

    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ""
    });

    const handleAddItem = (name: string, productId: number, quantity: number = 1) => {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId, quantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: "" }));
    }

    const handleRemoveItem = (name: string, productId: number, quantity: number = 1) => {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: "" }));
    }

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (<>

        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 650 }}>

                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {basket.items.map(item => (
                        <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display="flex" alignItems="center">
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                            <TableCell align="center">
                                <LoadingButton color="error"
                                    loading={status.loading && status.name === "remove" + item.productId}
                                    onClick={() => handleRemoveItem("remove" + item.productId, item.productId)}
                                >
                                    <Remove />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton color="secondary"
                                    loading={status.loading && status.name === "add" + item.productId}
                                    onClick={() => handleAddItem("add" + item.productId, item.productId)}
                                >
                                    <Add />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">
                                {currencyFormat(item.price * item.quantity)}
                            </TableCell>
                            <TableCell align="right">
                                <LoadingButton color="error"
                                    loading={status.loading && status.name === "delete" + item.productId}
                                    onClick={() => handleRemoveItem("delete" + item.productId, item.productId, item.quantity)}
                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

        </TableContainer>

        <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6} >
                <BasketSummary />
                <Button
                    component={Link}
                    to="/checkout"
                    variant="contained"
                    size="large"
                    fullWidth
                >
                    Checkout
                </Button>
            </Grid>
        </Grid>

    </>)

}

export default BasketPage;