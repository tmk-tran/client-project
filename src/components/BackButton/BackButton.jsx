import { Button } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
// ~~~~~~~~~~ Icon ~~~~~~~~~~
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function BackButton() {
  const history = historyHook();

  return (
    <Button
      onClick={() => {
        history.goBack();
      }}
    >
      <ArrowBackIosNewIcon />
      Back
    </Button>
  );
}
