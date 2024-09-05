import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
// ~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { centeredStyle } from "../Utils/pageStyles";

export default function LoadingSpinner({ text, waitingText, finalText, timeout, size }) {
  const [displayedText, setDisplayedText] = useState(text);
  const [showWaitingText, setShowWaitingText] = useState(false);

  useEffect(() => {
    // Timer to show waitingText
    const waitingTimer = setTimeout(() => {
      if (waitingText) {
        setShowWaitingText(true);
      }
    }, timeout ? timeout / 2 : 3000); // Show waitingText halfway through the timeout or default to 3000ms

    // Timer to show finalText
    const finalTimer = setTimeout(() => {
      setDisplayedText(finalText);
    }, timeout || 6000); // Default timeout if not provided

    // Clean up timers on unmount
    return () => {
      clearTimeout(waitingTimer);
      clearTimeout(finalTimer);
    };
  }, [finalText, timeout, waitingText]);

  return (
    <Box sx={centeredStyle}>
      <CircularProgress size={size} />
      {displayedText && (
        <Typography variant="body2">{displayedText}</Typography>
      )}
    </Box>
  );
}
