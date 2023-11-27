import { useEffect, useState } from "react";
// import HomePageCards from "./HomePageCards";
import HomePageCard from "./HomePageCard";
import { Container, Grid } from "@mui/material";
import { getFeatured } from "../../api/homeAPI";


const AdvertisedProperties = () => {
    const [featured, setFeatured] = useState([])

    //todo: remove with tenstack when database available
    useEffect(() => {
        getFeatured()
            .then(data => setFeatured(data))
    }, [])


    return (
        <div>
            <Container maxWidth="xl">
                <Grid container spacing={2} >
                    {featured.map((property, idx) =>

                        <Grid item xs={12} md={6} key={idx}>
                            <HomePageCard property={property} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default AdvertisedProperties;