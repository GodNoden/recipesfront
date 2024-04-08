'use client';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}


interface Product {
  id: number;
  title: string;
  calories: number;
  picture: string;
  ingredients: string[];
  preparation: string[];
}


const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const apiEndpoint = 'https://recipesserver-nest.abhb93.easypanel.host/recipes';
  const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let x = 0;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle errors gracefully, e.g., display an error message
      }
    };

    fetchProducts();
  }, [apiEndpoint]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {products.map((product, x) => (
        <div key={product.id} >
          <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardHeader
              title={product.title}
              subheader={week[x]}
            />
            <CardMedia
              component="img"
              height="194"
              image={product.picture}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography fontWeight={'800'}>Ingredients:</Typography>
                <Typography paragraph>
                  {product.ingredients.map((ingredient, index) => (
                    <Typography key={index} paragraph>
                      {ingredient}
                    </Typography>
                  ))}
                </Typography>

                <Typography fontWeight={'800'}>Preparation:</Typography>
                <Typography paragraph>
                  {product.preparation.map((preparation, index) => (
                    <Typography key={index} paragraph>
                      {preparation}
                    </Typography>
                  ))}
                </Typography>
              </CardContent>
            </Collapse>
          </Card></div>
      )
      )
      }
    </div>

  );
}
