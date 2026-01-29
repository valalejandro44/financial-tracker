from pydantic import BaseModel

class TransactionCreate(BaseModel):
    description: str
    amount: float
    type: str
    category: str

class TransactionOut(TransactionCreate):
    id: int

    class Config:
        orm_mode = True

