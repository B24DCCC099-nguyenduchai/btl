# app.py
from fastapi import FastAPI
import models
from db import engine
from routers import products, customers, orders, inventory, search
from fastapi.middleware.cors import CORSMiddleware

# create tables (if not exist)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Store Management API")

# Allow frontend origin (you may adjust)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers under prefix /api
app.include_router(products.router, prefix="/api")
app.include_router(customers.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(inventory.router, prefix="/api")
app.include_router(search.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Backend up. Use /api/... endpoints."}
