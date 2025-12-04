# routers/search.py
from fastapi import APIRouter, Depends, Query
from db import get_db
import controllers, utils
from sqlalchemy.orm import Session

router = APIRouter(prefix="/search")

@router.get("/")
def search(q: str = Query("", alias="q"), db: Session = Depends(get_db)):
    return utils.resp_ok(data=controllers.search_all(db, q))
