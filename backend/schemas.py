# schemas.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProductBase(BaseModel):
    code: Optional[str] = None
    name: str
    price: float
    stock: int

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    class Config:
        orm_mode = True

class CustomerBase(BaseModel):
    name: str
    birth_year: Optional[int] = None
    address: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerOut(CustomerBase):
    id: int
    class Config:
        orm_mode = True

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    code: Optional[str] = None
    customer_id: int
    items: List[OrderItemCreate]

class OrderItemOut(BaseModel):
    id: int
    product_id: int
    name: Optional[str] = None
    quantity: int
    price: float
    class Config:
        orm_mode = True

class OrderOut(BaseModel):
    id: int
    code: Optional[str] = None
    customer_id: int
    customer_name: Optional[str] = None
    created_at: datetime
    status: str
    items: List[OrderItemOut]
    class Config:
        orm_mode = True

class InventoryItemCreate(BaseModel):
    product_id: int
    quantity: int

class InventoryImportCreate(BaseModel):
    code: Optional[str] = None
    items: List[InventoryItemCreate]

class InventoryImportOut(BaseModel):
    id: int
    code: Optional[str]
    created_at: datetime
    items: List[dict]
    class Config:
        orm_mode = True
