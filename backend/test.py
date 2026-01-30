import psycopg
from psycopg.errors import OperationalError

DATABASE_URL = "postgresql://testing_user:zsgltFVdDzdp8V8kPCtVPjQHXOmp26rU@dpg-d5tuumi4d50c73bdmn7g-a.oregon-postgres.render.com/todo_app_2yz0"

try:
    with psycopg.connect(DATABASE_URL, connect_timeout=10) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM transactions;")
            rows = cur.fetchall()
            for row in rows:
                print(row)
            print("✅ Connected to Render PostgreSQL")
except OperationalError as e:
    print("❌ Connection failed")
    print(e)
