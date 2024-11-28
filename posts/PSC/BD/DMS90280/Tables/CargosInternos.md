# Table: CargosInternos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas_Origen | smallint | NO |
| PkFkCentros_Origen | smallint | NO |
| PkFkSecciones_Origen | int | NO |
| PkFkCentros_Destino | smallint | NO |
| PkFkDepartamentos | nvarchar | NO |
| PkFkImputacionTipos | smallint | NO |
| PkCargosInternos_Iden | smallint | NO |
| FkSecciones_Destino | int | YES |
| FkImpuestos | nvarchar | NO |
| IncrementaStock | bit | YES |
| FkVehiculoEstados | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Sobrecoste | bit | NO |
