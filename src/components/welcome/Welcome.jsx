import Box from "@mui/material/Box";
import BasicMenu from "../BasicMenu";

export default function Welcome() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4rem",
        paddingBottom: "1rem",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4rem",
          minHeight: 0,
        }}
      >
        <Box
          component="header"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2.25rem",
          }}
        ></Box>
        <Box
          sx={{
            maxWidth: "300px",
            width: "100%",
            padding: "0 1rem",
          }}
        >
          <Box
            component="nav"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1.875rem",
              border: "1px solid",
              borderColor: "divider",
              padding: "1.5rem",
              backgroundColor: "background.paper",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 2,
              },
            }}
          >
            <Box
              component="p"
              sx={{
                lineHeight: "1.5rem",
                color: "#374151",
                textAlign: "center",
                margin: 0,
                marginBottom: "1rem",
              }}
            >
              Ready?
            </Box>

            <BasicMenu />
          </Box>
        </Box>
        This is Hana's ChinWag App! A messaging project created for The Odin
        Project node.js course.
      </Box>
    </Box>
  );
}
