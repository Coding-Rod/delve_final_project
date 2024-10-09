from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from app.routes import auth, upload, ask, health

app = FastAPI()

# CORS configuration to allow access from different origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now, customize as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers for different API endpoints
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(upload.router, prefix="/upload", tags=["upload"])
app.include_router(ask.router, prefix="/ask", tags=["ask"])
app.include_router(health.router, prefix="/health", tags=["health"])

# Root endpoint to check if the API is running
@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

# No need to run the uvicorn server here, as this project is runned by 
# fastapi CLI