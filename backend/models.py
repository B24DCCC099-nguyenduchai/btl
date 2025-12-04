# models.py
from sqlalchemy import Column, Integer, String, DateTime, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), nullable=True)
    name = Column(String(255), nullable=False)
    price = Column(DECIMAL(13,2), nullable=False, default=0)
    stock = Column(Integer, nullable=False, default=0)

    def to_dict(self):
        return {"id": self.id, "code": self.code, "name": self.name, "price": float(self.price), "stock": self.stock}


class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    birth_year = Column(Integer, nullable=True)
    address = Column(String(500), nullable=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "birth_year": self.birth_year, "address": self.address}


class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), nullable=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="Pending")

    customer = relationship("Customer")
    items = relationship("OrderItem", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "code": self.code,
            "customer_id": self.customer_id,
            "customer_name": self.customer.name if self.customer else None,
            "created_at": self.created_at.isoformat(),
            "status": self.status,
            "items": [it.to_dict() for it in self.items]
        }


class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(DECIMAL(13,2), nullable=False, default=0)

    product = relationship("Product")

    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "name": self.product.name if self.product else None,
            "quantity": self.quantity,
            "price": float(self.price)
        }


class InventoryImport(Base):
    __tablename__ = "inventory_imports"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    items = relationship("InventoryItem", cascade="all, delete-orphan")

    def to_dict(self):
        return {"id": self.id, "code": self.code, "created_at": self.created_at.isoformat(), "items": [it.to_dict() for it in self.items]}


class InventoryItem(Base):
    __tablename__ = "inventory_items"
    id = Column(Integer, primary_key=True, index=True)
    import_id = Column(Integer, ForeignKey("inventory_imports.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)

    product = relationship("Product")

    def to_dict(self):
        return {"id": self.id, "import_id": self.import_id, "product_id": self.product_id, "product_name": self.product.name if self.product else None, "quantity": self.quantity}
