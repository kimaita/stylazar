import { styled, Link, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const LogoTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Lexend Peta, sans-serif",
}));

export default function SitemarkIcon() {
  const navigate = useNavigate();

  return (
    <LogoTypography
      variant={"button"}
      noWrap
      color="textSecondary"
      sx={{ display: { sm: "block" } }}
    //   pount
      onClick={() => {
        navigate("/");
      }}
    >
      STYLAZAR
    </LogoTypography>
  );
}
