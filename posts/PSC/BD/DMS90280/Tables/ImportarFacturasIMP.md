# Table: ImportarFacturasIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkImportarFacturasIMP | bigint | NO |
| FKModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| FechaAsiento | datetime | YES |
| FechaDocumento | datetime | YES |
| IdDocumentoEmitidoTipos | smallint | YES |
| IdFacturaTipos | nvarchar | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| IdPlantillas | nvarchar | YES |
| IdTerceros | nvarchar | YES |
| IdPagoFormas | nvarchar | YES |
| IdTerceroDirecciones | smallint | YES |
| IdRegistroTipos | nvarchar | YES |
| ConceptoAsiento | nvarchar | YES |
| IdAsientoTipos | nvarchar | YES |
| ReferenciaInterna | nvarchar | YES |
| IdCentros | smallint | YES |
| IdDepartamentos | nvarchar | YES |
| IdSecciones | int | YES |
| IdMarcas | smallint | YES |
| IdGamas | smallint | YES |
| IdMR | nvarchar | YES |
| IdClasificacion1 | nvarchar | YES |
| IdEntidades | nvarchar | YES |
| Texto | nvarchar | YES |
| BaseImponible | decimal | YES |
| BaseExenta | decimal | YES |
| BaseNoSujeta | decimal | YES |
| IdImpuestos | nvarchar | YES |
| IdIRPF | nvarchar | YES |
| Suplido | nvarchar | YES |
| Total | decimal | YES |
| MonedaCodISO | nvarchar | YES |
| FactorCambio | decimal | YES |
| IdMotivoExencion | nvarchar | YES |
| IdMotivoAbono | nvarchar | YES |
| SerieFacturaRelacionada | nvarchar | YES |
| NumFacturaRelacionada | nvarchar | YES |
| AñoFacturaRelacionada | nvarchar | YES |
| HashFactura | nvarchar | YES |
| NumProgramaEmison | nvarchar | YES |
| VersionProgramaVersion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| IdCompraCanales | nvarchar | YES |
| IdVentaCanales | nvarchar | YES |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FKEmpresas | smallint | YES |
| FechaImportacion | datetime | YES |
| HashControlAutoFactura | nvarchar | YES |
| FirmaAutoFactura | nvarchar | YES |
| GeneraSaft | nvarchar | YES |
| Referencia | nvarchar | YES |
