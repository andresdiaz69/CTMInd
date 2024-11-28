# Table: PrestamosAlquilerConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkVehiculos | int | NO |
| PkFkPrestamos | int | NO |
| PkFkAlquilerConceptos | smallint | NO |
| Precio | decimal | NO |
| Unidades | smallint | NO |
| DtoPorc | decimal | YES |
| DtoImporte | decimal | YES |
| FkImpuestos | nvarchar | YES |
| ImpuestoImporte | decimal | YES |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImpuestoPorc | decimal | YES |
| PrecioCoste | decimal | NO |
| UnidadesCoste | smallint | NO |
| ImporteCoste | decimal | NO |
| ServicioIncluido | bit | NO |
