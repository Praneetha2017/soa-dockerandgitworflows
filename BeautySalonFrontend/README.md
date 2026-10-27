# Beauty Salon Frontend

React + Vite + Bootstrap frontend for the BeautySalon Spring Boot backend.

## Run locally

1. Ensure the Spring Boot backend is running on port `8080`.
2. In this folder, run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL printed by Vite (normally `http://localhost:5173`).

## Backend connection

The frontend calls:
- `POST http://localhost:8080/beautysalon/add`
- `GET http://localhost:8080/beautysalon/displayall`
- `DELETE http://localhost:8080/beautysalon/delete/{id}`

If the backend uses a different port, update the `API` constant near the top of `src/App.jsx`.

For local development, configure the backend to allow CORS requests from `http://localhost:5173` (for example, using `@CrossOrigin(origins = "http://localhost:5173")` on the controller).
