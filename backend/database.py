#DATABASE_URL = "postgresql://luisalejandrordc:Barca2004#@localhost:5432/todo_db"

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
#from dotenv import load_dotenv

#load_dotenv()  # loads .env locally (Render ignores this)

DATABASE_URL = "postgresql://testing_user:zsgltFVdDzdp8V8kPCtVPjQHXOmp26rU@dpg-d5tuumi4d50c73bdmn7g-a.oregon-postgres.render.com/todo_app_2yz0"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
