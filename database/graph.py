import kuzu
import os

class GraphDatabase:
    def __init__(self, db_path: str = "data/somis_db"):
        if not os.path.exists("data"):
            os.makedirs("data")
        self.db = kuzu.Database(db_path)
        self.conn = kuzu.Connection(self.db)
        self._initialize_schema()

    def _initialize_schema(self):
        """Initializes the Kùzu schema with Nodes and Relationships."""
        try:
            # Nodes
            self.conn.execute("CREATE NODE TABLE Company(name STRING, industry STRING, PRIMARY KEY (name))")
            self.conn.execute("CREATE NODE TABLE Product(name STRING, category STRING, PRIMARY KEY (name))")
            self.conn.execute("CREATE NODE TABLE Resource(name STRING, type STRING, PRIMARY KEY (name))")
            self.conn.execute("CREATE NODE TABLE Location(name STRING, country STRING, PRIMARY KEY (name))")
            self.conn.execute("CREATE NODE TABLE Event(id STRING, type STRING, description STRING, date DATE, PRIMARY KEY (id))")

            # Relationships
            self.conn.execute("CREATE REL TABLE SUPPLIES(FROM Company TO Company, volume INT)")
            self.conn.execute("CREATE REL TABLE PRODUCES(FROM Company TO Product)")
            self.conn.execute("CREATE REL TABLE REQUIRES(FROM Product TO Resource)")
            self.conn.execute("CREATE REL TABLE LOCATED_IN(FROM Company TO Location)")
            self.conn.execute("CREATE REL TABLE AFFECTS(FROM Event TO Company, impact_score FLOAT)")
            self.conn.execute("CREATE REL TABLE AFFECTS_RESOURCE(FROM Event TO Resource, impact_score FLOAT)")
            print("Schema initialized successfully.")
        except Exception as e:
            if "Table already exists" in str(e):
                print("Schema already exists, skipping initialization.")
            else:
                print(f"Error initializing schema: {e}")

    def query(self, cypher: str):
        """Executes a Cypher query and returns the result."""
        return self.conn.execute(cypher)

if __name__ == "__main__":
    # Test initialization
    db = GraphDatabase()
    res = db.query("CALL table_info('Company') RETURN *")
    while res.has_next():
        print(res.get_next())
