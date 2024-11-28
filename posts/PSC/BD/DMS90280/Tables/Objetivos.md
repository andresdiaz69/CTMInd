# Table: Objetivos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkObjetivos | nvarchar | NO |
| PkAñoObjetivo | nvarchar | NO |
| PkFkModulos | nvarchar | NO |
| FkObjetivoTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkMarcas | smallint | YES |
| FkEmpleados | smallint | YES |
| FkTerceros_Agente | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkVentaInternaTipos | nvarchar | YES |
