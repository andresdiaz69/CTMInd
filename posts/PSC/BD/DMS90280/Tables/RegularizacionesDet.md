# Table: RegularizacionesDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoRegularizacion | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkRegularizacion | int | NO |
| PkRegularizacionesDet_Iden | int | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| FkUbicaciones | nvarchar | NO |
| Unidades | decimal | NO |
| FkCausaRegularizacion | smallint | NO |
| StockActual | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaAlta | datetime | NO |
| FkClasificacion1 | nvarchar | NO |
| PrecioMedio | decimal | NO |
| Confirmado | bit | NO |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| PrecioMedioPorEmpresa | decimal | YES |
| FactorCambioPMContravalor | decimal | YES |
| PrecioMedioRegularizado | decimal | YES |
