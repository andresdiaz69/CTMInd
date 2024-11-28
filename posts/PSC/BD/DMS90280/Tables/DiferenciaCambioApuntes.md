# Table: DiferenciaCambioApuntes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento_Factura | nvarchar | NO |
| PkFkAsientos_Factura | int | NO |
| PkFkContCtas_ProvisoriaApunte | nvarchar | NO |
| PkDiferenciaCambioApuntes_FechaApunte | datetime | NO |
| EsContCtasProvisoriaCierre | bit | NO |
| FkDiferenciaCambialTipoOperacion | tinyint | NO |
| FkAñoAsiento_ApunteDiferencial | nvarchar | YES |
| FkAsientos_ApunteDiferencial | int | YES |
| FkAsientosDet_ApunteDiferencial | int | YES |
| FkContCtas_EfectoApunte | nvarchar | YES |
| FkMonedas_Apunte | smallint | YES |
| FkMonedas_Pendiente | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteApunteMI | decimal | YES |
| ImporteApunteMC | decimal | YES |
| ImportePendienteMI | decimal | YES |
| ImportePendienteMC | decimal | YES |
| ImportePendienteMO | decimal | YES |
