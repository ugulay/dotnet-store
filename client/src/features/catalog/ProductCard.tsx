import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useState } from "react";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

interface Props {
    product: Product;
};

const ProductCard = ({ product }: Props) => {

    const [loading, setLoading] = useState(false);
    const { setBasket } = useStoreContext();

    const handleAddItem = (productId: number, quantity = 1) => {
        setLoading(true);
        agent.Basket.addItem(productId, quantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (

        <Card>

            <CardHeader avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: "bold", color: "primary.main" }
                }}
            />

            <CardMedia
                sx={{ height: 140, backgroundSize: "contain", bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />

            <CardContent>

                <Typography gutterBottom color="secondary" variant="h5" component="div">
                    {currencyFormat(product.price)}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>

            </CardContent>

            <CardActions>
                <LoadingButton
                    loading={loading}
                    size="small"
                    onClick={() => handleAddItem(product.id, 1)}>
                    Add to cart
                </LoadingButton>
                <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>

        </Card>

    );

}

export default ProductCard;