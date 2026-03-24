export interface DBColumn {
  name: string;
  type: string;
  isPK?: boolean;
  isFK?: boolean;
  fkRef?: string;
  description?: string;
}

export interface DBTable {
  name: string;
  operation: "INSERT" | "UPDATE" | "DELETE" | "INS+UPD" | "READ";
  columns: DBColumn[];
}

export interface ModuleData {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
  receivesFrom: string[];
  sendsTo: string[];
  aspxPages: string[];
  tables: DBTable[];
  businessFlow: string[];
  sampleData: Record<string, unknown>;
}
