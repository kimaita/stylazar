import { Link, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
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
      onClick={() => {
        navigate("/");
      }}
    >
      STYLAZAR
    </LogoTypography>
  );
}
