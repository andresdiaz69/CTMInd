# Table: DynamicsFacturaIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkDynamicsFacturaIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkFacturaTipos | nvarchar | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| NifCifTercero | nvarchar | YES |
| FkDocumentoEmitidoTipos | smallint | YES |
| FechaAsiento | datetime | YES |
| FechaFactura | datetime | YES |
| FkPlantillas | nvarchar | YES |
| FkPagoFormas | nvarchar | YES |
| FkRegistroTipos | nvarchar | YES |
| FkAsientoTipos | nvarchar | YES |
| FkSecciones | int | YES |
| MonedaCodISO | nvarchar | YES |
| FactorCambio | decimal | YES |
| ReferenciaInterna | nvarchar | YES |
| ConceptoAsiento | nvarchar | YES |
| FkMotivosAbono | nvarchar | YES |
| SerieFacturaAbonada | nvarchar | YES |
| NumFacturaAbonada | nvarchar | YES |
| AñoFacturaAbonada | nvarchar | YES |
| FkTerceroDirecciones | smallint | YES |
| BaseImponible | decimal | YES |
| BaseExenta | decimal | YES |
| BaseNoSujeta | decimal | YES |
| TotalFactura | decimal | YES |
| Texto | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCentrosDesglose | smallint | YES |
| FkSeccionesDesglose | int | YES |
