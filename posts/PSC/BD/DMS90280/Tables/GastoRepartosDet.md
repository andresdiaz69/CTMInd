# Table: GastoRepartosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas_Gasto | smallint | NO |
| PkFkGastoTipos | smallint | NO |
| PkFkEmpresas_Reparto | smallint | NO |
| PkGastoRepartosDet_Iden | smallint | NO |
| PorcRepartoDet | decimal | NO |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
