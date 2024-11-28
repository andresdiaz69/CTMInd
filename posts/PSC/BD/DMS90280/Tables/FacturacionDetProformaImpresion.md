# Table: FacturacionDetProformaImpresion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFacturaProforma | nvarchar | NO |
| PkFkSeries_Proforma | nvarchar | NO |
| PkFkNumFacturaProforma | nvarchar | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries_OT | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| FkCentros | smallint | NO |
| Descripcion | nvarchar | YES |
| FkAñoPresupuesto | nvarchar | YES |
| FkSeries_Presupuesto | nvarchar | YES |
| FkNumPresupuesto | int | YES |
| NumeroAutorizacion | nvarchar | YES |
| NumSiniestro | nvarchar | YES |
| ImporteMO | decimal | YES |
| ImporteMAT | decimal | YES |
| ImporteSUB | decimal | YES |
| ImporteVarios | decimal | YES |
| ImportePintura | decimal | YES |
| FkVehiculos | int | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| DescripcionModelo | nvarchar | YES |
| Kmts | int | YES |
| NumeroPoliza | nvarchar | YES |
| HorasMO | int | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
