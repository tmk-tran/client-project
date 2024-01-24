import { Button } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";

export default function BackButton() {
  const history = historyHook();

  return (
    <Button
    //   style={{ position: "absolute", left: 0 }}
      onClick={() => {
        history.goBack();
      }}
    >
      Back
    </Button>
  );
}
