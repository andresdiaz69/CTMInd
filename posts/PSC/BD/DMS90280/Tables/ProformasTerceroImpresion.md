# Table: ProformasTerceroImpresion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkProformas | int | NO |
| PkFkTerceros_Proforma | int | NO |
| PkFkAñoProforma | nvarchar | NO |
| PkFkSeries_Proforma | nvarchar | NO |
| PkFkNumProforma | nvarchar | NO |
| PkProformasTerceroImpresion_Iden | smallint | NO |
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
