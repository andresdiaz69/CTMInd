# Table: ProformasVODetTercero

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkFkProformasVO | int | NO |
| PkFkProformasVODet | smallint | NO |
| PkFkTerceros_ProformaVO | int | NO |
| PkAñoProformaVO | nvarchar | NO |
| PkFkSeries_ProformaVO | nvarchar | NO |
| PkNumProformaVO | nvarchar | NO |
| FkPlantillaCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | NO |
| Porcentaje | decimal | YES |
| PorcentajeReparto | decimal | NO |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| NumDecimalesRedondeo | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
