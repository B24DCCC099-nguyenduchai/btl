# routers/customers.py
from fastapi import APIRouter, Depends, HTTPException
from db import get_db
import controllers, utils
from sqlalchemy.orm import Session

router = APIRouter(prefix="/customers")

@router.get("/")
def customers_list(db: Session = Depends(get_db)):
    return utils.resp_ok(data=controllers.list_customers(db))

@router.get("/{customer_id}")
def customer_get(customer_id: int, db: Session = Depends(get_db)):
    c = controllers.get_customer(db, customer_id)
    if not c:
        raise HTTPException(status_code=404, detail="Customer not found")
    return utils.resp_ok(data=c)

@router.post("/")
def customer_create(payload: dict, db: Session = Depends(get_db)):
    c = controllers.create_customer(db, payload)
    return utils.resp_ok(data=c, message="Customer created")

@router.put("/{customer_id}")
def customer_update(customer_id: int, payload: dict, db: Session = Depends(get_db)):
    c = controllers.update_customer(db, customer_id, payload)
    if not c:
        raise HTTPException(status_code=404, detail="Customer not found")
    return utils.resp_ok(data=c, message="Customer updated")

@router.delete("/{customer_id}")
def customer_delete(customer_id: int, db: Session = Depends(get_db)):
    ok = controllers.delete_customer(db, customer_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Customer not found")
    return utils.resp_ok(message="Customer deleted")
