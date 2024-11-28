# Table: AlquilerTarifasConceptosImportes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAlquilerTarifas | smallint | NO |
| PkFkAlquilerConceptos | smallint | NO |
| PkAlquilerTarifasConceptosImportes_Iden | smallint | NO |
| DiasDesde | smallint | NO |
| DiasHasta | smallint | NO |
| Importe | decimal | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteCoste | decimal | YES |
| IdExterno | nvarchar | YES |
