# Table: FacturaAtipicaDetImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkFacturaAtipicaDet | int | NO |
| PkFkRegimenContable | nvarchar | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| PkFkImpuestos | nvarchar | NO |
| PorcImpuesto | decimal | NO |
| Cuota | decimal | NO |
| FkContCtas | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkImpuestos_Origen | nvarchar | YES |
| Dependiente | bit | YES |
