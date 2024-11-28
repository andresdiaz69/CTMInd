# Table: EntradasTrabajosExternos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoEntradaTrabajosExternos | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkSeries_EntradasTrabajosExternos | nvarchar | NO |
| PkEntradasTrabajosExternos | nvarchar | NO |
| FkCentros | smallint | NO |
| FkOrigenesCompras | tinyint | NO |
| FkEmpleados | smallint | NO |
| FkPagoFormas | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| Observaciones | nvarchar | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FKWFEntidades | smallint | YES |
| FKWFEstados | smallint | YES |
| FKWFClasificaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| BaseImponible | decimal | YES |
| BaseExenta | decimal | YES |
| FkAñoAsiento_Albaran | nvarchar | YES |
| FkAsientos_Albaran | int | YES |
| NumeroAsiento | int | YES |
| NumeroAsiento_Albaran | int | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| FactorCambioMonedaContravalor_Factura | decimal | YES |
