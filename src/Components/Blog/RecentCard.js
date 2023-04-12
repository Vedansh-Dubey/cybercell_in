import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const CardInfo = styled(CardContent)(({theme}) => ({
    '&:last-child': {
        paddingBottom: theme.spacing(2),
      }
  }));

const RecentCard = ({ recent }) => {
    return (
        <Card sx={{ maxWidth: 250, position: "relative" }}>
            <Box sx={{ position: 'relative'}}>
                <CardMedia
                    component="img"
                    height="350"
                    image={recent.image}
                    alt={recent.title}/>
            </Box>

            <CardInfo>
                <Typography variant="h6" gutterBottom component="div">
                    {recent.title}
                </Typography>

                <Typography mb={0} variant="subtitle1" gutterBottom component="div">
                    {recent.releaseDate}
                </Typography>
            </CardInfo>
        </Card>
    )
}

RecentCard.propTypes = {
    recent: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        releaseDate: PropTypes.string
    }).isRequired,
}

export default RecentCard;
