# routers/inventory.py
from fastapi import APIRouter, Depends, HTTPException
from db import get_db
import controllers, utils
from sqlalchemy.orm import Session

router = APIRouter(prefix="/inventory")

@router.get("/")
def imports_list(db: Session = Depends(get_db)):
    return utils.resp_ok(data=controllers.list_imports(db))

@router.post("/")
def import_create(payload: dict, db: Session = Depends(get_db)):
    imp = controllers.create_import(db, payload)
    return utils.resp_ok(data=imp, message="Import created")
