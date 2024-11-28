# Table: RecuentoPeriodosContadores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkSecciones | int | NO |
| PkFkRecuentoPeriodos | smallint | NO |
| PkRecuentoPeriodosContador_Iden | smallint | NO |
| FkEmpleados | smallint | YES |
| FkDispositivos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
