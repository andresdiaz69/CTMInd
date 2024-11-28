# Table: RappelsCumplimentaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkAñoRappels | nvarchar | NO |
| PkFkRappels | nvarchar | NO |
| PkFkModulos | nvarchar | NO |
| PkRappelsCumplimentaciones_Iden | smallint | NO |
| NumUnidades | smallint | YES |
| ImporteFacturado | decimal | YES |
| ImporteOpcionales | decimal | YES |
| ImporteAjuste | decimal | YES |
| PorcentajeAjuste | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Mes | tinyint | NO |
| VIN | nvarchar | NO |
| FkAñoExpediente | nvarchar | NO |
| FkSeries_Expediente | nvarchar | NO |
| FkNumExpediente | int | NO |
| ImporteCumplimentacion | decimal | YES |
| BaseCalculo | decimal | YES |
| FkVentas | smallint | NO |
| FkEmpleados | smallint | NO |
| FechaMod | datetime | NO |
