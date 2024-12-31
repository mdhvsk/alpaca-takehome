from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import notes

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(notes.router)


@app.get("/")
async def health_check():
    return {"status": "healthy"}


