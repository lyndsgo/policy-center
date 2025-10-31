import LinkCard from "@/components/LinkCard/LinkCard";
import { useAuthContext } from "@/contexts/AuthContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NAV_ITEMS } from "@/layouts/PageLayout/PageLayout";

const HomePage = () => {
  const { userData } = useAuthContext();

  return (
    <Box>
      <Typography variant="h5" component="h1">
        Hello, {userData?.firstname}!
      </Typography>
      <Typography component="p" className="mt-2">
        Check out your security policies
      </Typography>
      <Grid container spacing={2} className="mt-6">
        {NAV_ITEMS.map((item) => (
          <Grid size={6} key={item.title}>
            <LinkCard key={item.title} {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
