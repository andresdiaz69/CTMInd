# Table: PresupuestosWebDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkPresupuestosWeb | int | NO |
| PkPresupuestosWebDet_Iden | smallint | NO |
| Descripcion | nvarchar | YES |
| FkPresupuestosWebEstados | tinyint | NO |
| FechaCambioEstado | datetime | YES |
| DatosCambioEstado | nvarchar | YES |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkAñoPresupuesto | nvarchar | NO |
| FkSeries_Presupuesto | nvarchar | NO |
| FkNumPresupuesto | int | NO |
| CodigoExterno | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
