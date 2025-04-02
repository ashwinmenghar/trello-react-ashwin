import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <Box
      w="100%"
      fontWeight="600"
      fontSize="22px"
      textAlign="center"
      mt="10px"
      color="dark"
    >
      <Link>Boards</Link>
    </Box>
  );
};

export default Header;
