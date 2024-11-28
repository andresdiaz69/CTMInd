# Table: ReferenciasDepreciaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| PkReferenciasDepreciaciones_Iden | smallint | NO |
| FechaDepreciacion | datetime | NO |
| PrecioMedio | decimal | NO |
| Stock | decimal | NO |
| PorcentajeDepreciacion | decimal | NO |
| PrecioMedioDepreciado | decimal | NO |
| FkEmpleados | smallint | NO |
| FechaAlta | datetime | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkCentros | smallint | YES |
| FkObsoletosDepreciacionTramos | smallint | NO |
| PrecioVenta | decimal | NO |
| FechaMod | datetime | NO |
| FkAñoAsiento_Anulacion | nvarchar | YES |
| FkAsientos_Anulacion | int | YES |
| FactorCambioPMContravalor | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
