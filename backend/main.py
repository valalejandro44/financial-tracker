from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import engine, SessionLocal
from models import Base, Transaction
from schemas import TransactionCreate, TransactionOut

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://financial-tracker-frontend-duvm.onrender.com"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/transactions", response_model=List[TransactionOut])
def get_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).all()

@app.post("/transactions", response_model=TransactionOut)
def add_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db)
):
    t = Transaction(**transaction.dict())
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

