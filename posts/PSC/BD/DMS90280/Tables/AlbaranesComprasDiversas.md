# Table: AlbaranesComprasDiversas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkAñoAlbaranesComprasDiversas | nvarchar | NO |
| PkSeries_AlbaranesComprasDiversas | nvarchar | NO |
| PkAlbaranesComprasDiversas | nvarchar | NO |
| FkCentros | smallint | NO |
| FkOrigenesCompras | tinyint | NO |
| FkEmpleados | smallint | NO |
| FkPagoFormas | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| Observaciones | nvarchar | YES |
| FkAñoAsiento_Provision | nvarchar | YES |
| FkAsientos_Provision | int | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkWFEntidades | smallint | YES |
| FkWFEstados | smallint | YES |
| FkWFClasificaciones | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkAñoAsiento_Albaran | nvarchar | YES |
| FkAsientos_Albaran | int | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| NumBono | nvarchar | YES |
| Timbre | decimal | YES |
