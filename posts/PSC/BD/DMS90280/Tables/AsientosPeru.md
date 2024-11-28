# Table: AsientosPeru

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| SerieComprobantePercepcion | nvarchar | YES |
| NumComprobanteRetencion | nvarchar | YES |
| FechaDocRetencion | datetime | YES |
| TipoDocumento | nvarchar | YES |
| FechaCobro | datetime | YES |
| FkMonedas_Percepcion | smallint | YES |
| ImporteDocumentoPercepcion | decimal | YES |
| ImporteCambioMonedaPercepcion | decimal | YES |
| PorcPercepcion | decimal | YES |
| ImportePercepcion | decimal | YES |
| TotalCobradoPercepcion | decimal | YES |
| FkContCtas_Percepcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCtaBancarias_PercepcionDebe | smallint | YES |
| FkConceptoBancarios_PercepcionDebe | nvarchar | YES |
| FkContCtas_PercepcionHaber | nvarchar | YES |
| FkCtaBancarias_PercepcionHaber | smallint | YES |
| FkConceptoBancarios_PercepcionHaber | nvarchar | YES |
| FechaConsDepDetraccion | datetime | YES |
| NumConsDepDetraccion | nvarchar | YES |
| NumLote | nvarchar | YES |
| RetieneIGV | bit | NO |
| FkServicioTipos | smallint | YES |
| ImporteBienes | decimal | YES |
| ImporteServicios | decimal | YES |
| FkTipoBien | smallint | YES |
| FkTipoBien_609 | smallint | YES |
