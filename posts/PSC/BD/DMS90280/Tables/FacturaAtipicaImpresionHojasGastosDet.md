# Table: FacturaAtipicaImpresionHojasGastosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFacturaAtipicaImpresionHojasGastos_Iden | tinyint | NO |
| SufijoFactura | nvarchar | YES |
| Importe | decimal | NO |
| NumAutorizacionLiquidacion | nvarchar | YES |
| NombreTerceroLiquidacion | nvarchar | YES |
| FechaFacturaLiquidacion | datetime | YES |
| SerieFacturaLiquidacion | nvarchar | YES |
| NumFacturaLiquidacion | nvarchar | YES |
| AñoFacturaLiquidacion | nvarchar | YES |
| Texto | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| NombreDetalle | nvarchar | YES |
