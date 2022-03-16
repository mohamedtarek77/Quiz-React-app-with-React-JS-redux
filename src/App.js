import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FinalScreen from "./pages/FinalScreen";
import Questions from "./pages/Questions";
import Settings from "./pages/Settings";

import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Typography variant="h2" fontWeight="bold">
                    Quiz App
                  </Typography>
                  <Settings />
                </div>
              }
            />

            <Route path="/questions" element={<Questions />} />
            <Route path="/score" element={<FinalScreen />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
