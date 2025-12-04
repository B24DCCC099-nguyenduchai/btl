# routers/orders.py
from fastapi import APIRouter, Depends, HTTPException
from db import get_db
import controllers, utils
from sqlalchemy.orm import Session

router = APIRouter(prefix="/orders")

@router.get("/")
def orders_list(db: Session = Depends(get_db)):
    return utils.resp_ok(data=controllers.list_orders(db))

@router.get("/{order_id}")
def order_get(order_id: int, db: Session = Depends(get_db)):
    o = controllers.get_order(db, order_id)
    if not o:
        raise HTTPException(status_code=404, detail="Order not found")
    return utils.resp_ok(data=o)

@router.post("/")
def order_create(payload: dict, db: Session = Depends(get_db)):
    o = controllers.create_order(db, payload)
    return utils.resp_ok(data=o, message="Order created")

# Support PATCH /orders/{id}/complete (matches frontend earlier)
@router.patch("/{order_id}/complete")
def order_complete_patch(order_id: int, db: Session = Depends(get_db)):
    o = controllers.complete_order(db, order_id)
    if not o:
        raise HTTPException(status_code=404, detail="Order not found")
    return utils.resp_ok(data=o, message="Order completed")

# Also support PUT /orders/complete/{order_id} (some frontend variants)
@router.put("/complete/{order_id}")
def order_complete_put(order_id: int, db: Session = Depends(get_db)):
    o = controllers.complete_order(db, order_id)
    if not o:
        raise HTTPException(status_code=404, detail="Order not found")
    return utils.resp_ok(data=o, message="Order completed")
