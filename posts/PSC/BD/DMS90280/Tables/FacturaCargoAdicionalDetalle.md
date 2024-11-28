# Table: FacturaCargoAdicionalDetalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries_Factura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFacturaCargoAdicionalDetalle_Iden | smallint | NO |
| FkTerceros | int | NO |
| FkSeries_Expediente_VO | nvarchar | YES |
| FkNumExpediente_VO | int | YES |
| FkAñoExpediente_VO | nvarchar | YES |
| FkVentas_VO | smallint | YES |
| FkSeries_Expediente_VN | nvarchar | YES |
| FkNumExpediente_VN | int | YES |
| FkAñoExpediente_VN | nvarchar | YES |
| FkVentas_VN | smallint | YES |
| FkVehiculos | int | YES |
| BaseImponible | decimal | YES |
| BaseExenta | decimal | YES |
| BaseNosujeta | decimal | YES |
| FkCentros | smallint | YES |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| IvaPorc | decimal | YES |
| IvaImporte | decimal | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| Comision | nvarchar | YES |
| NombreMarca | nvarchar | NO |
| NombreGama | nvarchar | NO |
| DescripcionModelo | nvarchar | NO |
| DescripcionVersion | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCentros_Secciones | smallint | YES |
| FkSecciones | int | YES |
| FkSeries_Factura_Asociada | nvarchar | YES |
| FkNumFactura_Asociada | nvarchar | YES |
| FkAñoFactura_Asociada | nvarchar | YES |
| FkTerceros_Asociada | int | YES |
| FkBaterias | int | YES |
| ImporteSuplidos | decimal | YES |
