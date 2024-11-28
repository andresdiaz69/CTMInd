# Table: ReferenciaHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| PkReferenciaHistoricos_Iden | int | NO |
| FechaAlta | datetime | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PermiteGarantia | bit | NO |
| NoPedirNormal | bit | NO |
| NoPedirUrgente | bit | NO |
| Habilitado | bit | NO |
| FkFabricantes | smallint | YES |
| CodigoLlave | bit | NO |
| FkClasificacion1 | nvarchar | YES |
| FkClasificacion2 | nvarchar | YES |
| FkClasificacion3 | nvarchar | YES |
| FkClasificacion4 | nvarchar | YES |
| FkClasificacion5 | nvarchar | YES |
| FkClasificacion6 | nvarchar | YES |
| Calificada | bit | NO |
| FkDescuentos | nvarchar | YES |
| FkImpuestos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkUsuarios | smallint | YES |
| StockMin | decimal | YES |
| StockMax | decimal | YES |
| FechaMod | datetime | NO |
| FkImpuestos_IVACompras | nvarchar | YES |
| FkPartidaArancelaria | nvarchar | YES |
| RequiereCertificacion | bit | NO |
| Caducidad | bit | NO |
| RequiereVinEnPedidosMarca | bit | NO |
| ControlLotes | bit | NO |
| CodificacionAutomaticaLotes | bit | NO |
| ImprimirEtiquetasLotes | bit | NO |
| AsignacionAutoFechaCaducidadLotes | bit | YES |
| DiasCaducidadLotes | smallint | YES |
| FkFechaOrigenCaducidadLotes | tinyint | YES |
| MascaraLote | nvarchar | YES |
| CodFabricante | nvarchar | YES |
