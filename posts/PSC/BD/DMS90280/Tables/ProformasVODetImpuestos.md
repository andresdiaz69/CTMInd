# Table: ProformasVODetImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkFkProformasVO | int | NO |
| PkFkProformasVODet | smallint | NO |
| PkFkConceptosOperacion_Impuesto | nvarchar | NO |
| FkPlantillasCalculo | nvarchar | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| ImporteCoste | decimal | YES |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| CalculadoPorcentaje | bit | NO |
| NumDecimalesRedondeo | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
