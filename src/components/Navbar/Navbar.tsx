// src/components/Navbar/Navbar.tsx
import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Container, Box, Link } from "@mui/material";

function Navbar() {
  const location = useLocation();
  // Detectamos si estamos en el Home
  const isHome = location.pathname === "/";

  const navItems = ["Inicio", "Nosotros", "Servicios", "Contacto"];

  return (
    <AppBar
      // Si es Home, flota sobre el Hero. Si no, se queda fijo arriba y empuja el contenido hacia abajo.
      position={isHome ? "absolute" : "sticky"}
      elevation={isHome ? 0 : 4}
      sx={{
        backgroundColor: isHome ? "transparent" : "#3f3e3aff", // Color de marca para el resto
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        transition: "all 0.3s ease-in-out", // Transición suave al cambiar de página
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: isHome ? "center" : "space-between",
            height: { xs: 60, md: isHome ? 90 : 70 }, // Más compacto en móviles
          }}
        >
          {/* Logo Brand */}
          <Box
            component={NavLink}
            to="/"
            sx={{
              display: isHome ? "none" : "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="MGT"
              sx={{
                height: { xs: 40, md: isHome ? 48 : 58 }, // Más pequeño en móviles
                width: "auto",
                transition: "all 0.3s",
              }}
            />
          </Box>

          {/* Links de navegación */}
          <Box
            component="ul"
            sx={{
              display: { xs: "none", md: "flex" }, // Ocultar en móviles
              listStyle: "none",
              gap: 3.5,
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map((item) => (
              <Box component="li" key={item}>
                <Link
                  component={NavLink}
                  to={
                    item === "Inicio"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "")}`
                  }
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    position: "relative",
                    paddingBottom: "4px",
                    transition: "opacity 0.2s",
                    "&:hover": {
                      opacity: 0.8,
                    },
                    // Línea blanca al hacer hover
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: 0,
                      height: "2px",
                      backgroundColor: "white",
                      transition: "width 0.3s ease-in-out",
                    },
                    "&:hover:after": {
                      width: "100%",
                    },
                    // Mantiene la línea si la pestaña está activa
                    "&.active:after": {
                      width: "100%",
                    },
                  }}
                >
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
