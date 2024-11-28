# Table: GastoFacturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkGastoFacturas_Iden | smallint | NO |
| PkFkAsientos | int | NO |
| PkFkGastoTipos | smallint | NO |
| FkEmpresas_Recibida | smallint | NO |
| FkAsientos_Recibida | int | NO |
| BaseImponible | decimal | NO |
| PorcIva | decimal | NO |
| ImporteIva | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkImpuestos | nvarchar | NO |
| FkTextoSistema_CSW | int | YES |
| FkTextoSistema_EI | int | YES |
| FkTextoSistema_IRM | int | YES |
| FkTextoSistema_LPDRtf | int | YES |
