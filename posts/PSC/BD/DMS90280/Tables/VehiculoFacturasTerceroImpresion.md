# Table: VehiculoFacturasTerceroImpresion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkVehiculoFacturas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries_Factura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkVehiculoFacturasTerceroImpresion_Iden | smallint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkPlantillasImpresion | nvarchar | NO |
| FkPlantillasCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | YES |
| FkPlantillaImpresionConceptos | smallint | NO |
| Concepto | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Porcentaje | decimal | YES |
| Importe | decimal | YES |
| NumOrden | smallint | NO |
| FormatoImpresion | tinyint | NO |
| NumDecimalesRedondeo | tinyint | NO |
| Font | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
