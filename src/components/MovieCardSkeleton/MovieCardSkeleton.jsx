import { Card, Skeleton, CardContent } from '@mui/material';

function MovieCardSkeleton() {
  return (
    <Card sx={{ width: 200 }}>
      <Skeleton variant="rectangular" height={280} animation="wave" />
      <CardContent sx={{ p: 1 }}>
        <Skeleton variant="text" width="80%" animation="wave" />
      </CardContent>
    </Card>
  );
}

export default MovieCardSkeleton;
