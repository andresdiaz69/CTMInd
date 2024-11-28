# Table: RecuentosProgramacionDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkRecuentosProgramacion | int | NO |
| PkRecuentosProgramacionDet | bigint | NO |
| FkUbicaciones | nvarchar | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| FkDispositivos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados | smallint | YES |
| FechaBaja | datetime | YES |
