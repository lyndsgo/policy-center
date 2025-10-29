import Box from "@mui/material/Box";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { Link } from "react-router-dom";

interface LinkCardProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  url: string;
}

const LinkCard = ({ icon: Icon, title, url }: LinkCardProps) => {
  return (
    <Link
      to={url}
      className="group hover:border-brand-accent block rounded-lg border-2 border-gray-200 p-4 transition hover:bg-gray-100"
    >
      <Icon
        aria-hidden
        className="h-6 w-6 text-gray-600 transition group-hover:text-gray-800"
      />
      <Box
        component="span"
        className="mt-2 block text-xl font-medium text-gray-800 group-hover:text-black"
      >
        {title}
      </Box>
    </Link>
  );
};

export default LinkCard;
