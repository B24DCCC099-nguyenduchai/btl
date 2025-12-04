# routers/products.py
from fastapi import APIRouter, Depends, HTTPException
from db import get_db
import controllers, utils
from sqlalchemy.orm import Session

router = APIRouter(prefix="/products")

@router.get("/")
def products_list(db: Session = Depends(get_db)):
    return utils.resp_ok(data=controllers.list_products(db))

@router.get("/{product_id}")
def product_get(product_id: int, db: Session = Depends(get_db)):
    p = controllers.get_product(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return utils.resp_ok(data=p)

@router.post("/")
def product_create(payload: dict, db: Session = Depends(get_db)):
    p = controllers.create_product(db, payload)
    return utils.resp_ok(data=p, message="Product created")

@router.put("/{product_id}")
def product_update(product_id: int, payload: dict, db: Session = Depends(get_db)):
    p = controllers.update_product(db, product_id, payload)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return utils.resp_ok(data=p, message="Product updated")

@router.delete("/{product_id}")
def product_delete(product_id: int, db: Session = Depends(get_db)):
    ok = controllers.delete_product(db, product_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Product not found")
    return utils.resp_ok(message="Product deleted")
