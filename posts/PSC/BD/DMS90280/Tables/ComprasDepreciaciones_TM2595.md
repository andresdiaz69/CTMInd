# Table: ComprasDepreciaciones_TM2595

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkComprasDepreciacionesAño | nvarchar | NO |
| PkComprasDepreciacionesMes | smallint | NO |
| Fecha | datetime | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Porcentaje | decimal | NO |
| PorcentajeTramo | decimal | NO |
| FkEmpleados | smallint | NO |
| FkCompraInternaTipos | nvarchar | NO |
| FkDepreciacionTramos | smallint | NO |
| FechaMod | datetime | NO |
| PkFkCompraNumDet | smallint | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
