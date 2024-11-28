# Table: AlquilerOfertasConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAlquilerOfertas | smallint | NO |
| PkFkAlquilerConceptos | smallint | NO |
| FkGarantiaAdicionalTipos | nvarchar | YES |
| FkGarantiaAdicionalGrupos | nvarchar | YES |
| Precio | decimal | NO |
| Unidades | smallint | NO |
| DtoPorc | decimal | YES |
| DtoImporte | decimal | YES |
| FkImpuestos | nvarchar | YES |
| ImpuestoImporte | decimal | YES |
| ImpuestoPorc | decimal | YES |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PrecioCoste | decimal | NO |
| UnidadesCoste | smallint | NO |
| ImporteCoste | decimal | NO |
