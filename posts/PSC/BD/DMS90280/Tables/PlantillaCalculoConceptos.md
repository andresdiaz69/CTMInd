# Table: PlantillaCalculoConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkPlantillasCalculo | nvarchar | NO |
| PkFkConceptosOperacion | nvarchar | NO |
| Descripcion | nvarchar | NO |
| NumOrden | smallint | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| FkModulos | nvarchar | NO |
| Visible | bit | NO |
| ConceptoManual | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FormatoImpresion | tinyint | NO |
| NumDecimalesRedondeo | tinyint | NO |
| FechaMod | datetime | NO |
