# controllers.py
from sqlalchemy.orm import Session
from models import Product, Customer, Order, OrderItem, InventoryImport, InventoryItem
from datetime import datetime

# PRODUCTS
def list_products(db: Session):
    return [p.to_dict() for p in db.query(Product).all()]

def get_product(db: Session, product_id: int):
    p = db.query(Product).filter(Product.id == product_id).first()
    return p.to_dict() if p else None

def create_product(db: Session, data: dict):
    p = Product(code=data.get("code"), name=data["name"], price=data["price"], stock=data["stock"])
    db.add(p)
    db.commit()
    db.refresh(p)
    return p.to_dict()

def update_product(db: Session, product_id: int, data: dict):
    p = db.query(Product).filter(Product.id == product_id).first()
    if not p:
        return None
    p.code = data.get("code")
    p.name = data.get("name", p.name)
    p.price = data.get("price", p.price)
    p.stock = data.get("stock", p.stock)
    db.commit()
    db.refresh(p)
    return p.to_dict()

def delete_product(db: Session, product_id: int):
    p = db.query(Product).filter(Product.id == product_id).first()
    if not p:
        return False
    db.delete(p)
    db.commit()
    return True

# CUSTOMERS
def list_customers(db: Session):
    return [c.to_dict() for c in db.query(Customer).all()]

def get_customer(db: Session, customer_id: int):
    c = db.query(Customer).filter(Customer.id == customer_id).first()
    return c.to_dict() if c else None

def create_customer(db: Session, data: dict):
    c = Customer(name=data["name"], birth_year=data.get("birth_year"), address=data.get("address"))
    db.add(c)
    db.commit()
    db.refresh(c)
    return c.to_dict()

def update_customer(db: Session, customer_id: int, data: dict):
    c = db.query(Customer).filter(Customer.id == customer_id).first()
    if not c:
        return None
    c.name = data.get("name", c.name)
    c.birth_year = data.get("birth_year", c.birth_year)
    c.address = data.get("address", c.address)
    db.commit()
    db.refresh(c)
    return c.to_dict()

def delete_customer(db: Session, customer_id: int):
    c = db.query(Customer).filter(Customer.id == customer_id).first()
    if not c:
        return False
    db.delete(c)
    db.commit()
    return True

# ORDERS
def list_orders(db: Session):
    orders = db.query(Order).order_by(Order.created_at.desc()).all()
    return [o.to_dict() for o in orders]

def get_order(db: Session, order_id: int):
    o = db.query(Order).filter(Order.id == order_id).first()
    return o.to_dict() if o else None

def create_order(db: Session, data: dict):
    # data: { code?, customer_id, items: [{product_id, quantity}] }
    order = Order(code=data.get("code"), customer_id=data["customer_id"], created_at=datetime.utcnow(), status="Pending")
    db.add(order)
    db.commit()
    db.refresh(order)
    # create items and optionally reduce stock
    for it in data["items"]:
        prod = db.query(Product).filter(Product.id == it["product_id"]).first()
        price = float(prod.price) if prod else 0
        oi = OrderItem(order_id=order.id, product_id=it["product_id"], quantity=it["quantity"], price=price)
        db.add(oi)
        # optionally reduce stock here (frontend flows may expect)
        if prod:
            prod.stock = prod.stock - it["quantity"]
    db.commit()
    db.refresh(order)
    return order.to_dict()

def complete_order(db: Session, order_id: int):
    o = db.query(Order).filter(Order.id == order_id).first()
    if not o:
        return None
    o.status = "Completed"
    db.commit()
    db.refresh(o)
    return o.to_dict()

# INVENTORY (imports)
def list_imports(db: Session):
    imps = db.query(InventoryImport).order_by(InventoryImport.created_at.desc()).all()
    return [imp.to_dict() for imp in imps]

def create_import(db: Session, data: dict):
    imp = InventoryImport(code=data.get("code"), created_at=datetime.utcnow())
    db.add(imp)
    db.commit()
    db.refresh(imp)
    for it in data["items"]:
        prod = db.query(Product).filter(Product.id == it["product_id"]).first()
        inv_item = InventoryItem(import_id=imp.id, product_id=it["product_id"], quantity=it["quantity"])
        db.add(inv_item)
        if prod:
            prod.stock = prod.stock + it["quantity"]
    db.commit()
    db.refresh(imp)
    return imp.to_dict()

# SEARCH
def search_all(db: Session, keyword: str):
    key = f"%{keyword}%"
    prods = db.query(Product).filter(Product.name.ilike(key)).all()
    custs = db.query(Customer).filter(Customer.name.ilike(key)).all()
    return {"products": [p.to_dict() for p in prods], "customers": [c.to_dict() for c in custs]}
