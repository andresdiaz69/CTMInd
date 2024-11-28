# Table: OfertasVODet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkOfertasVODet_Iden | smallint | NO |
| FkPlantillaCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | NO |
| NumOrden | smallint | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| Descripcion | nvarchar | NO |
| CargoCliente | bit | NO |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| FormatoImpresion | tinyint | NO |
| CalculadoPorcentaje | bit | NO |
| NumDecimalesRedondeo | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
