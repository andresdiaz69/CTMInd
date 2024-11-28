# Table: AlquilerTarifasConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAlquilerTarifas | smallint | NO |
| PkFkAlquilerConceptos | smallint | NO |
| Importe | decimal | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkImpuestos | nvarchar | YES |
| ImporteCoste | decimal | YES |
| ServicioIncluido | bit | NO |
| IdExterno | nvarchar | YES |
