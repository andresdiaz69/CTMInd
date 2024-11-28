# Table: AlquilerFacturasPrestamosConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries_Factura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkCentros_Prestamo | smallint | NO |
| PkFkVehiculos | int | NO |
| PkFkPrestamos | int | NO |
| PkFkAlquilerConceptos | smallint | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | NO |
| Unidades | smallint | NO |
| DtoPorc | decimal | YES |
| DtoImporte | decimal | YES |
| BaseImpuesto | decimal | NO |
| FkImpuestos | nvarchar | YES |
| ImpuestoPorc | decimal | YES |
| ImpuestoImporte | decimal | YES |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PrecioCoste | decimal | NO |
| UnidadesCoste | smallint | NO |
| ImporteCoste | decimal | NO |
| ServicioIncluido | bit | NO |
