# Table: VentaMarcaTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkVentaMarcaTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| VentaEspecial | bit | NO |
| AfectaRappel | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ReduccionImpuestoPorc | decimal | YES |
