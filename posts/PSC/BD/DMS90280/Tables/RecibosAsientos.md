# Table: RecibosAsientos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkRecibos | int | NO |
| PkRecibosAsientos_Iden | tinyint | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| UserAlta | smallint | NO |
| FechaAlta | datetime | NO |
| NumTalon | nvarchar | YES |
| Voucher | nvarchar | YES |
| FkContCtas | nvarchar | YES |
